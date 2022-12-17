# security-zone-api
Repositório para a API utilizada no projeto, que contém todas as consultas ao banco de dados.

## Queries:

### Quantidade de Bairros no Rio de Janeiro
- Rota: "/bairros"
- Consulta: "SELECT COUNT(*) as Quantidade FROM Bairro;"
    

### Quantidade de Zonas Administrativas no Rio de Janeiro
- Rota: "/zonas"
- Consulta: "SELECT COUNT(*) as Quantidade FROM Zona_Administrativa_IPS;"
    

### Relação de Bairros e suas respectivas Zonas Administrativas
- Rota: "/bairros-zonas"
- Consulta: "SELECT Bairro.Nome AS Bairro Zona_Administrativa_IPS.Nome AS Zona FROM Bairro INNER JOIN Zona_Administrativa_IPS ON Bairro.fk_Zona_Administrativa_IPS_ID = Zona_Administrativa_IPS.ID;"
    

### Quantidade de famílias participantes do Programa Bolsa Família por Bairro
- Rota: "/pbf-familias-bairro"
- Consulta: "SELECT Bairro.Nome as Bairro Familias_com_PBF FROM Bairro"
    

### Quantidade de famílias participantes do Programa Bolsa Família por Zona Administrativa
- Rota: "/pbf-familias-zona"
- Consulta: "SELECT Zona_Administrativa_IPS.Nome as Zona Zona_Administrativa_IPS.ID AS Zona_ID SUM(Familias_com_PBF) as Familias_com_PBF FROM Zona_Administrativa_IPS INNER JOIN Bairro ON Zona_Administrativa_IPS.ID = Bairro.fk_Zona_Administrativa_IPS_ID GROUP BY Zona_Administrativa_IPS.ID;"
    

### Quantidade de famílias participantes do Programa Bolsa Família na cidade do Rio de Janeiro
- Rota: "/pbf-familias-cidade"
- Consulta: "SELECT SUM(Familias_com_PBF) as Soma FROM Bairro;"
    

### Quantidade de pessoas em Pobreza e Extrema Pobreza por Bairro
- Rota: '/pobreza-bairro'
- Consulta: "SELECT Bairro.Nome SUM(Possui.Quantidade) AS Quantidade FROM Bairro INNER JOIN Possui ON Bairro.ID = Possui.fk_Bairro_ID WHERE Possui.fk_Tipo_Familia_Nome IN ('Extrema Pobreza' 'Pobreza') GROUP BY Bairro.Nome;"
    

### Quantidade de pessoas em Pobreza e Extrema Pobreza por Zona Administrativa
- Rota: '/pobreza-zona'
- Consulta: "SELECT Zona_Administrativa_IPS.Nome Zona_Administrativa_IPS.ID AS Zona_ID SUM(Possui.Quantidade) AS Quantidade FROM (Bairro INNER JOIN Zona_Administrativa_IPS ON Bairro.fk_Zona_Administrativa_IPS_ID = Zona_Administrativa_IPS.ID) INNER JOIN Possui ON Bairro.ID = Possui.fk_Bairro_ID WHERE Possui.fk_Tipo_Familia_Nome IN ('Extrema Pobreza''Pobreza') GROUP BY Zona_Administrativa_IPS.Nome Zona_Administrativa_IPS.ID;"
    

### Quantidade de pessoas em Pobreza e Extrema Pobreza na cidade do Rio de Janeiro
- Rota: '/pobreza-cidade'
- Consulta: "SELECT SUM(Quantidade) AS Soma FROM Possui WHERE fk_Tipo_Familia_Nome IN ('Pobreza' 'Extrema Pobreza');"
    

### Índice de Progresso Social por Zona Administrativa
- Rota: '/ips-zona'
- Consulta: "SELECT Nome Conceito_Geral ID FROM Zona_Administrativa_IPS;"
    

### Índice de Progresso Social da cidade do Rio de Janeiro
- Rota: '/ips-cidade'
- Consulta: "SELECT SUM(Conceito_Geral) as Soma FROM Zona_Administrativa_IPS;"
    

### Soma de crimes por Zona Administrativa
- Rota: '/crimes-zona'
- Consulta: "SELECT Zona_Administrativa_IPS.Nome Zona_Administrativa_IPS.Populacao AS Populacao Zona_Administrativa_IPS.ID AS Zona_ID SUM(Ocorrencia.Quantidade) AS Quantidade FROM (Engloba INNER JOIN Zona_Administrativa_IPS ON Engloba.fk_Zona_Administrativa_IPS_ID = Zona_Administrativa_IPS.ID) INNER JOIN Ocorrencia ON Engloba.fk_CISP_ID = Ocorrencia.fk_CISP_ID GROUP BY Zona_Administrativa_IPS.ID;"
    

### Soma de crimes na cidade do Rio de Janeiro
- Rota: '/crimes-cidade'
- Consulta: "SELECT SUM(Ocorrencia.Quantidade) AS Soma_Total FROM (Engloba INNER JOIN Zona_Administrativa_IPS ON Engloba.fk_Zona_Administrativa_IPS_ID = Zona_Administrativa_IPS.ID) INNER JOIN Ocorrencia ON Engloba.fk_CISP_ID = Ocorrencia.fk_CISP_ID;"
    

### Quantidade de moradores do Rio de Janeiro
- Rota: '/populacao-cidade'
- Consulta: "SELECT SUM(Populacao) AS Soma FROM Zona_Administrativa_IPS;"
    

### Quantidade de bairros por Zona Administrativa
- Rota: '/bairros-por-zona'
- Consulta: "SELECT Zona_Administrativa_IPS.Nome Zona_Administrativa_IPS.ID COUNT(*) as Contagem FROM Zona_Administrativa_IPS LEFT OUTER JOIN Bairro ON Zona_Administrativa_IPS.ID = Bairro.fk_Zona_Administrativa_IPS_ID GROUP BY Zona_Administrativa_IPS.ID;"
    

### Informações mais detalhadas sobre uma Zona Administrativa
- Rota: '/zona-detalhada'
- Consulta: "SELECT * FROM Zona_Administrativa_IPS;"
