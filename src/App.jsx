import './App.css'
import Content from './modules/posts/Content'
import Navbar from './modules/nav/Navbar'
import {useState, useEffect} from 'react'
import PageAccount from './modules/accounts/PageAccount'

function App() {
  const [page, setPage] = useState('Posts')
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState([]) 
  const [numberOfPosts, setNumberOfPosts] = useState(8)

  useEffect(() => {
    (async function getPosts() {
      const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
      const finalPosts = await posts.json()
      setPosts(finalPosts)
    })();

    (async function getUsers() {
      const users = await fetch('https://jsonplaceholder.typicode.com/users')
      const finallyUsers = await users.json()
      setUsers(finallyUsers)
    })();
  },[])

  function handleClickShowMore() {
    setNumberOfPosts(numberOfPosts + 8)
  }

  function handleClickAccount(e) {
    const userId = Number(e.target.closest('.content_block_author').id)
    setPage('Account')
    setCurrentUser(users.find(user => user.id === userId));
  }

  function handleClickPosts(e) {
    setPage('Posts')
  }

  switch (page) {
    case 'Posts':
      return (
        <>
          <Navbar 
            handleClickPosts = {handleClickPosts}
          />
          <div className='heading'>
            <h1>All posts</h1>
          </div>
          <Content 
            posts = {posts}
            users = {users}
            numberOfPosts = {numberOfPosts}
            handleClickShowMore = {handleClickShowMore}
            handleClickAccount = {handleClickAccount}
          />
        </>
      )
    
    case 'Account': 
      return (
        <>
          <Navbar 
            handleClickPosts = {handleClickPosts}
          />
          <PageAccount 
            user = {currentUser}
          />
        </>
      )
  }
}

export default App
