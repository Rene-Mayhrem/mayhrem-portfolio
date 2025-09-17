
import About from './components/About'
import GithubStats from './components/GithubStats'
import Header from './components/Header'
import Hero from './components/Hero'
import ParticleBackground from './components/ParticleBackground'
import Skills from './components/Skills'

function App() {

  return (
    <>
        <title>René Cruz | DevOps Engineer / Java Developer</title>
        <meta name='description'content='The portfolio of Rene Cruz, a DevOps Engineer & Java Developer specializing in cloud automation, Kubernetes, and scalable infrastructure solutions.'/>
        <meta property='og:title' content='Rene Cruz | DevOps Engineer'/>
        <meta property='og:description' content='Portfolio'/>
      <div className="min-h-screen relative" style={{ perspective: '1200px' }}>
        <ParticleBackground />
        <Header />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <GithubStats />
        </main>
      </div>
    </>
  )
}

export default App
