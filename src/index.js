const { GraphQLServer } = require('graphql-yoga')

const links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root, args) => {
            const link = links.find(i => {
                return i.id == args.id
            })
            return link
        },
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            const link = {
                id: args.id,
                description: args.description,
                url: args.url,
            }
            const index = links.findIndex(i => i.id == args.id)
            links.splice(index, 1, link)
            return link
        },
        deleteLink: (root, args) => {
            const index = links.findIndex(i => i.id == args.id)
            const link = links[index]
            links.splice(index, 1)
            return link
        },
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
