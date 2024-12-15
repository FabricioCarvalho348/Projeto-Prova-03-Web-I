<div>
    <p align="center">
      <img src="https://img.shields.io/badge/Projeto-WebI-purple" height="130" alt="product-flow-api">
    </p>
</div>

![Status de Desenvolvimento](https://img.shields.io/badge/Status-Concluido-green)

# Sobre
<p>Projeto avaliativo 03 de uma API em Kotlin com Spring Boot e frontend com HTML, CSS e JavaScript</p>

### Funcionamento
Tanto a lista de comidas disponiveis como as opções de recheios são dinamicas de acordo com o banco de dados por isso temos que fazer inserções dentro do PostgreSQL

# Executar o projeto

### Clone o repositório:

```
git@github.com:FabricioCarvalho348/Prova-03-Web-I.git
```
    
### Garanta que tenha o Java 21 instalado:
abra o seu terminal e digite o comando:
```
java --version
```
se não instale o java 21 através do link:
```
https://www.oracle.com/br/java/technologies/downloads/#java21
```

# Configurar banco de dados

No caminho src/main/resources e no arquivo application.properties configure seu banco de dados PostgreSQL, colocando o nome do seu banco de dados que você criou dentro do pgAdmin
coloque o user do seu potgreSQL e sua senha 

Execute as querys que estão no arquivo desse projeto em QuerysSql para criação das tabelas e tem exemplos de inserções de comidas e recheios para as comidas dentro do seu PostgreSQL, pode ser pelo pgAdmin utilizando o Query Tool

com isso feito o projeto pode ser executado tranquilamente na IDE IntelliJ 


