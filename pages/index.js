import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Cors from 'cors';

import Layout from '../components/layout'


function Home(data) {
  const [ userInput, setUserInput ] = useState('');
  const [ receivedData, setReceivedData ] = useState(null);
  const [ ShowSectionBoolean, setShowsectionBoolean ] = useState(true);
  const [ interests, setInterests ] = useState('');

  const getInputValue = (e) => {
    setUserInput(e.target.value);    
} 
  
  const onSubmission = async (e) => {
    e.preventDefault();
    const userDataStream= await fetch(`https://torre.bio/api/bios/${userInput}`)
    const userData = await userDataStream.json();
    setReceivedData(userData);
    setUserInput('')
    setShowsectionBoolean(false);
    setInterests(userData.interests)
    if(userData) {
      console.log(userData);    
  }
}

  let header = receivedData ? <h1 className={styles.header}>{`Welcome to ${receivedData.person.name}'s profile`}</h1> : <h1 className={styles.header}>Search for the username you like</h1>

  let section = ShowSectionBoolean ? <section>
            <form method='GET'>
              <label htmlFor="user">Please enter the username to find</label><br/>
              <input 
              className={styles.userInput}
              value={userInput} 
              name="username" 
              onChange={getInputValue} 
              id="user" 
              placeholder="username"/>
              <br/>
              <button 
              className={styles.actionButton} 
              onClick={onSubmission} 
              type="submit">
              Search
              </button>
            </form>
          </section>
          : null;

    let photo = receivedData ? <img className={styles.picture}src={`${receivedData.person.picture}`}/> : null;
    
    let interestsSection = receivedData ? 
    <div>
      <h2>His interests are:</h2><br/>
          
      <div className={styles.infoContainer}>
        {(receivedData && interests) ? interests.map((interest, index) => {
        if(index > 8) return;
        return <div className={styles.infoContainerItem}><p>{interest.name}</p></div>
      }) : null}            
      </div>
    </div> : null;
    
    
  return (
    <div>
      <Layout>
        <header>
          {header}
        </header>
        <main>
          {section}
          <section>
            {photo}
          </section>
            {interestsSection}
        </main>
      </Layout>
    </div>
  )
}


export default Home;