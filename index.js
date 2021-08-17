const { ApolloServer, gql } = require("apollo-server");

const perfis = [
  {
    id: 1,
    role: "Comum",
  },
  {
    id: 2,
    role: "Administrador",
  },
];

const typeDefs = gql`
  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Perfil {
    id: Int
    role: String
  }

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Query {
    ola: String
    horaAtual: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
    perfis: [Perfil]
    perfil(id: Int): Perfil
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        return produto.preco * (1 - produto.desconto);
      } else {
        return produto.preco;
      }
    },
  },

  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    },
  },
  Query: {
    ola() {
      return "Cheguei aqui";
    },
    horaAtual() {
      return `${new Date()}`;
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Leonardo",
        email: "leo.maga17@gmail.com",
        idade: 33,
        salario_real: 1200,
        vip: true,
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Notebook",
        preco: 4890.89,
        desconto: 0.15,
      };
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b;
      Array(6)
        .fill(0)
        .map((n) => parseInt(Math.random() * 60 + 1))
        .sort(crescente);
      //   return [4, 5, 8, 45, 68, 72];
    },
    perfis() {
      return perfis;
    },
    perfil(_, { id }) {
      const f = perfis.filter( a => a.id === id)
      return f ? f[0] : null
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
