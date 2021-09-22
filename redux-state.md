{
   users: {
      1: {
         id: 1,
         username: "Demo",
         email: "demo@aa.io",
         profilePicture: "picture-link",
         subscriptions : [subsaidditId, subsaidditId, subsaidditId]
         createdat: new Date()
         updatedat: new Date()
      },
   },
   subsaiddits: {
      1: {
         id: 1,
         name: "Technology",
         description: "Companies that build new things",
         rules: "Rules text goes here",
         owner_id: 1,
         moderator_1_id: 2,
         moderator_2_id: 20,
         moderator_3_id: 30,
         followers : [followerId, followerId, followerId]
      },
   },
   posts: {
      1: {
         id: 1,
         title: "Interesting companies",
         content: "disinfect and rinse",
         image: false,
         owner_id: 1,
         subsaiddit_id: 1,
      },
   },
   postVotes: {
       1: {
           id: 1,
           userId: 1,
           postId: 1,
           type: 'UP'
       },
   },
   comments: {
       1: {
           id: 1,
           userId: 1,
           postId: 1,
           content: 'the comment itself goes here'
       }
   }


   errors: [
         "Unauthorized",
         "Incorrect username/password combination",
      ]
}