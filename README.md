# [jpedromagalhaes.vercel.app](https://jpedromagalhaes.vercel.app/)

- **Framework**: [Next.js](https://nextjs.org/)
- **Banco de Dados**: [Supabase](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Autenticação**: [NextAuth.js](https://next-auth.js.org/)
- **Deploy**: [Vercel](https://vercel.com)
- **Estilo**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes**: [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)

## Como executar

```bash
# Clone o repositório
git clone https://github.com/joaom00/jpedromagalhaes.git

# Entre na pasta do projeto
cd jpedromagalhaes

# Instale as dependências
yarn

# Execute o servidor localmente
yarn dev
```

Criar um arquivo `.env` similar a `.env.example`

## Supabase

Você pode usar o supabase **local** (self-hosted) ou **remotamente** (hosted
by supabase).

### Supabase Remoto

1. Crie um projeto em [app.supabase.io](https://app.supabase.io/)
2. Pegue a string de conexão em Settings -> Database -> Connection String
3. Coloque-a no `.env` em `DATABASE_URL`

### Supabase Local

1. Instale a [CLI](https://github.com/supabase/cli#install-the-cli)
2. Na pasta do projeto, digite `supabase start` (necessário ter **docker** instalado)
3. Copie o `DB URL` que aparecerá no seu terminal e cole no `.env` em `DATABASE_URL`

Veja este [guia](https://github.com/supabase/cli/tree/main/examples/tour) se
você nunca usou a CLI

## Referências

- [Brian Lovin](https://brianlovin.com/)
- [Lee Robinson](https://leerob.io/)
- [Rychillie](https://rychillie.net/)

## Me encontre

- [LinkedIn](https://www.linkedin.com/in/joaom00/)
- [GitHub](https://github.com/joaom00)
