const express = require("express");
const database = require('./database')

const router = express.Router();

const RouteQuery = [
    {
        action: "Retorna a quantidade de Bairros no Rio de Janeiro",
        route: "/bairros",
        query: "SELECT COUNT(*) as Quantidade FROM Bairro;"
    },
    {
        action: "Retorna a quantidade de Zonas Administrativas no Rio de Janeiro",
        route: "/zonas",
        query: "SELECT COUNT(*) as Quantidade FROM Zona_Administrativa_IPS;"
    },
    {
        action: "Retorna a relação de Bairros e suas respectivas Zonas Administrativas",
        route: "/bairros-zonas",
        query: "SELECT Bairro.Nome AS Bairro, Zona_Administrativa_IPS.Nome AS Zona FROM Bairro INNER JOIN Zona_Administrativa_IPS ON Bairro.fk_Zona_Administrativa_IPS_ID = Zona_Administrativa_IPS.ID;"
    },
    {
        action: "Retorna a quantidade de famílias participantes do Programa Bolsa Família por Bairro",
        route: "/pbf-familias-bairro",
        query: "SELECT Bairro.Nome as Bairro, Familias_com_PBF FROM Bairro"
    },
    {
        action: "Retorna a quantidade de famílias participantes do Programa Bolsa Família por Zona Administrativa",
        route: "/pbf-familias-zona",
        query: "SELECT Zona_Administrativa_IPS.Nome as Zona, Zona_Administrativa_IPS.ID AS Zona_ID, SUM(Familias_com_PBF) as Familias_com_PBF FROM Zona_Administrativa_IPS INNER JOIN Bairro ON Zona_Administrativa_IPS.ID = Bairro.fk_Zona_Administrativa_IPS_ID GROUP BY Zona_Administrativa_IPS.ID;"
    },
    {
        action: "Retorna a quantidade de famílias participantes do Programa Bolsa Família na cidade do Rio de Janeiro",
        route: "/pbf-familias-cidade",
        query: "SELECT SUM(Familias_com_PBF) as Soma FROM Bairro;"
    },
    {
        action: "Retorna a quantidade de pessoas em Pobreza e Extrema Pobreza por Bairro",
        route: '/pobreza-bairro',
        query: "SELECT Bairro.Nome, SUM(Possui.Quantidade) AS Quantidade FROM Bairro INNER JOIN Possui ON Bairro.ID = Possui.fk_Bairro_ID WHERE Possui.fk_Tipo_Familia_Nome IN ('Extrema Pobreza', 'Pobreza') GROUP BY Bairro.Nome;"
    },
    {
        action: "Retorna a quantidade de pessoas em Pobreza e Extrema Pobreza por Zona Administrativa",
        route: '/pobreza-zona',
        query: "SELECT Zona_Administrativa_IPS.Nome, Zona_Administrativa_IPS.ID AS Zona_ID, SUM(Possui.Quantidade) AS Quantidade FROM (Bairro INNER JOIN Zona_Administrativa_IPS ON Bairro.fk_Zona_Administrativa_IPS_ID = Zona_Administrativa_IPS.ID) INNER JOIN Possui ON Bairro.ID = Possui.fk_Bairro_ID WHERE Possui.fk_Tipo_Familia_Nome IN ('Extrema Pobreza','Pobreza') GROUP BY Zona_Administrativa_IPS.Nome, Zona_Administrativa_IPS.ID;"
    },
    {
        action: "Retorna a quantidade de pessoas em Pobreza e Extrema Pobreza na cidade do Rio de Janeiro",
        route: '/pobreza-cidade',
        query: "SELECT SUM(Quantidade) AS Soma FROM Possui WHERE fk_Tipo_Familia_Nome IN ('Pobreza', 'Extrema Pobreza');"
    },
    {
        action: "Retorna o Índice de Progresso Social por Zona Administrativa",
        route: '/ips-zona',
        query: "SELECT Nome, Conceito_Geral, ID FROM Zona_Administrativa_IPS;"
    },
    {
        action: "Retorna o Índice de Progresso Social da cidade do Rio de Janeiro",
        route: '/ips-cidade',
        query: "SELECT SUM(Conceito_Geral) as Soma FROM Zona_Administrativa_IPS;"
    },
    {
        action: "Retorna a soma de crimes por Zona Administrativa",
        route: '/crimes-zona',
        query: "SELECT Zona_Administrativa_IPS.Nome, Zona_Administrativa_IPS.Populacao AS Populacao, Zona_Administrativa_IPS.ID AS Zona_ID, SUM(Ocorrencia.Quantidade) AS Quantidade FROM (Engloba INNER JOIN Zona_Administrativa_IPS ON Engloba.fk_Zona_Administrativa_IPS_ID = Zona_Administrativa_IPS.ID) INNER JOIN Ocorrencia ON Engloba.fk_CISP_ID = Ocorrencia.fk_CISP_ID GROUP BY Zona_Administrativa_IPS.ID;"
    },
    {
        action: "Retorna a soma de crimes na cidade do Rio de Janeiro",
        route: '/crimes-cidade',
        query: "SELECT SUM(Ocorrencia.Quantidade) AS Soma_Total FROM (Engloba INNER JOIN Zona_Administrativa_IPS ON Engloba.fk_Zona_Administrativa_IPS_ID = Zona_Administrativa_IPS.ID) INNER JOIN Ocorrencia ON Engloba.fk_CISP_ID = Ocorrencia.fk_CISP_ID;"
    },
    {
        action: "Retorna a quantidade de moradores do Rio de Janeiro",
        route: '/populacao-cidade',
        query: "SELECT SUM(Populacao) AS Soma FROM Zona_Administrativa_IPS;"
    },
    {
        action: "Retorna a quantidade de bairros por Zona Administrativa",
        route: '/bairros-por-zona',
        query: "SELECT Zona_Administrativa_IPS.Nome, Zona_Administrativa_IPS.ID, COUNT(*) as Contagem FROM Zona_Administrativa_IPS LEFT OUTER JOIN Bairro ON Zona_Administrativa_IPS.ID = Bairro.fk_Zona_Administrativa_IPS_ID GROUP BY Zona_Administrativa_IPS.ID;"
    },
    {
        action: "Retorna informações mais detalhadas sobre uma Zona Administrativa",
        route: '/zona-detalhada',
        query: "SELECT * FROM Zona_Administrativa_IPS;"
    }
]

RouteQuery.forEach((route) => {
    router.get(route.route, async (req, res) => {
        res.send(await database.query(route.query));
    })
})


module.exports = router;