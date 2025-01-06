import {createContext, useContext, useState, useEffect} from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
    // console.log(faker.hacker.phrase())
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      body: faker.hacker.phrase(),
    };
  }

// 1)⭐⭐⭐ Create a context
const PostContext = createContext();

function PostProvider({children}) {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
      );
      const [searchQuery, setSearchQuery] = useState("");
      const [isFakeDark, setIsFakeDark] = useState(false);
    
      // Derived state. These are the posts that will actually be displayed
      const searchedPosts = 
        searchQuery.length > 0
          ? posts.filter((post) =>
              `${post.title} ${post.body}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
          : posts;
    
          console.log(searchedPosts);
    
      function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
      }
    
      function handleClearPosts() {
        setPosts([]);
      }
    
      // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
      useEffect(
        function () {
          document.documentElement.classList.toggle("fake-dark-mode");
        },
        [isFakeDark]
      );
    // 2)⭐⭐⭐ Setting a CONTEXT at top level component tree
      return <PostContext.Provider value={
        {
          posts: searchedPosts,
          onAddPost: handleAddPost,
          onClearPosts: handleClearPosts,
          searchQuery, // searchQuery: searchQuery both are same
          setSearchQuery,
          isFakeDark,
          setIsFakeDark
        }}>
        {children}
        </PostContext.Provider>
}

function usePosts(){
    const context = useContext(PostContext);
    if(context === undefined) throw new Error("PostContext was used outside of the PostProvider");
    return context;
}

export {PostProvider, usePosts};