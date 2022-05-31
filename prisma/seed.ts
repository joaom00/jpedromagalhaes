import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.bookmark.createMany({
    data: [
      {
        title: 'When Does React Render Your Component?',
        url: 'https://www.zhenghao.io/posts/react-rerender',
        host: 'zhenghao.io',
        faviconUrl:
          'https://res.cloudinary.com/dubkeylyq/image/upload/v1651376493/zhenghao-favicon_japayv.ico',
        description: 'When and why does React render my component exactly?'
      },
      {
        title: 'Why We Memo All the Things',
        url: 'https://attardi.org/why-we-memo-all-the-things/',
        host: 'attardi.org',
        faviconUrl: 'https://res.cloudinary.com/dubkeylyq/image/upload/v1641826529/link_gjrwna.png',
        description:
          'On my team at Coinbase, we ask everyone to use the React performance trinity – memo, useMemo, and useCallback – all the time. For some reason, this is controversial. I’m guessing this has something to do with Twitter. This article explains why we do it anyway.'
      },
      {
        title: 'Compound Components',
        url: 'https://jjenzz.com/compound-components',
        host: 'jjenzz.com',
        faviconUrl:
          'https://res.cloudinary.com/dubkeylyq/image/upload/v1642801573/jjenzz-favicon_ntdzq4.png',
        description:
          'Compound components provide a declarative API that can allow for some impressive solutions to everyday problems. But what are they?'
      }
    ]
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
