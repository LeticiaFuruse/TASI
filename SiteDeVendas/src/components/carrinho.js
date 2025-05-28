import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuCliente from "./menuCliente";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Grid,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Carrinho = () => {
    const navigate = useNavigate();

    const [produtosVendidos, setProdutosVendidos] = useState([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [data, setData] = useState("");
    const usuario = localStorage.getItem("USUARIO");

    const [carregado, setCarregado] = useState(false);

    // Ao carregar, pega do localStorage e adiciona quantidade 1 se não existir
    useEffect(() => {
        const carrinhoLocal = JSON.parse(localStorage.getItem("CARRINHO")) || [];
        const comQuantidade = carrinhoLocal.map((p) => ({
            ...p,
            quantidade: 1,
        }));
        setProdutosVendidos(comQuantidade);
        setCarregado(true);
    }, []);

    useEffect(() => {
        if (carregado) {
            localStorage.setItem("CARRINHO", JSON.stringify(produtosVendidos));
        }
    }, [produtosVendidos, carregado]);




    // Incrementa a quantidade
    const aumentarQuantidade = (id) => {
        setProdutosVendidos((oldProdutos) =>
            oldProdutos.map((p) =>
                p._id === id ? { ...p, quantidade: p.quantidade + 1 } : p
            )
        );
    };

    // Decrementa a quantidade e remove se chegar a 0
    const diminuirQuantidade = (id) => {
        setProdutosVendidos((oldProdutos) => {
            const atualizados = oldProdutos
                .map((p) =>
                    p._id === id ? { ...p, quantidade: p.quantidade - 1 } : p
                )
                .filter((p) => p.quantidade > 0); // remove os com quantidade 0
            return atualizados;
        });
    };

    const criarVenda = async () => {
        if (!nomeCliente || !data) {
            alert("Por favor, preencha o nome do cliente e a data.");
            return;
        }
        if (produtosVendidos.length === 0) {
            alert("O carrinho está vazio.");
            return;
        }

        const url = "https://backend-completo.vercel.app/app/venda";
        const dados = {
            usuario,
            nomeCliente,
            data,
            produtos: produtosVendidos,
        };
        const token = localStorage.getItem("ALUNO_ITE");

        try {
            const retorno = await axios.post(url, dados, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (retorno.data.error) {
                alert(retorno.data.error + " Erro ao registrar");
                console.log(retorno);
                return;
            }

            if (retorno.data._id) {
                alert("Registrado com sucesso");
                console.log(retorno);
                localStorage.removeItem("CARRINHO"); // limpa o carrinho após venda
                navigate("/");
            }
        } catch (error) {
            alert("Erro na conexão com o servidor.");
            console.error(error);
        }
    };

    return (
        <div>
            <MenuCliente />

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom color="white">
                    Carrinho de Compras
                </Typography>

                <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                        label="Nome do Cliente"
                        variant="outlined"
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}
                        fullWidth
                        sx={{ backgroundColor: "white", borderRadius: 1 }}
                    />
                    <TextField
                        label="Data"
                        type="date"
                        variant="outlined"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{ backgroundColor: "white", borderRadius: 1 }}
                    />
                </Box>

                <Typography variant="h6" gutterBottom color="white">
                    Produtos no Carrinho:
                </Typography>

                {produtosVendidos.length === 0 ? (
                    <Typography color="white">O carrinho está vazio.</Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                        {produtosVendidos.map((produto) => (
                            <Paper
                                key={produto._id}
                                sx={{
                                    p: 2,
                                    backgroundColor: "#333",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    <Typography variant="subtitle1">{produto.nome}</Typography>
                                    <Typography>R$ {produto.preco.toFixed(2)}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        minWidth: 120,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => diminuirQuantidade(produto._id)}
                                        size="small"
                                    >
                                        -
                                    </Button>
                                    <Typography sx={{ minWidth: 20, textAlign: "center" }}>
                                        {produto.quantidade}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => aumentarQuantidade(produto._id)}
                                        size="small"
                                    >
                                        +
                                    </Button>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={criarVenda}
                    disabled={produtosVendidos.length === 0}
                >
                    Confirmar Venda
                </Button>
            </Container>
        </div>
    );
};

export default Carrinho;
