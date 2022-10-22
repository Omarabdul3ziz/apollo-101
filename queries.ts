const query = `
mutation SignUp {
  singup(email: "admin@apollo.com", password: ".com", name: "Abdul") {
    token
    user {
      name
    }
  }
}

mutation Login {
  login(email: "admin@apollo.com", password: ".com") {
    token
    user {
      name
    }
  }
}

mutation Post {
  post(url: "nexusjs.org", description: "Code-First GraphQL schemas for JavaScript/TypeScript") {
    description
    postedBy {
      name
    }
  }
}

query AllPosts {
  feed {
    links {
      id
      createdAt
      description
    }
  }
}

query Counted {
  feed(take: 1) {
    count
    links {
      id
      createdAt
      description
    }
  }
}

query Filtered {
  feed(filter: "2") {
    id
    links {
      id
      createdAt
      description
    }
  }
}

query Paginated {
  feed(skip: 2, take: 2) {
    id
    links {
      id
      createdAt
      description
    }
  }
}
query Sorted {
  feed(orderBy: [{ createdAt: desc }]) {
    id
    links {
      id
      createdAt
      description
    }
  }
}
query SinglePost {
  link(id: 1) {
    id
    description
    url
  }
}

mutation EditPost {
  updateLink(id: 1, description: "Post #0", url: "...") {
    description
    url
  }
}

mutation DeletePost {
  deleteLink(id: 4) {
    description
    url
  }
}



mutation Vote {
  vote(linkId: 1) {
    link {
      url
      description
      voters {
        name
      }
    }
    user {
      name
      email
    }
  }
}

`;
