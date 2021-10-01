import './Footer.css'

const Footer = () => {
    const creators = [
    {
        'name': 'Jordan Bohmbach',
        'Github': 'https://github.com/jordan-bohmbach',
        'Linkedin': 'https://www.linkedin.com/in/jordanbohmbach/',
    }
    ]

    return (
        <div className='footer-container'>
            <div className='footer-contact'>
                <h1> Contact </h1>
            </div>

            <div className='footer-contact-info'>
                <h2>{creators[0].name}</h2>
                {creators.map((person) => (
                    <div className='footer-contact-links' key={person.name}>
                        <a href={person.Github}><img className='tag' src="https://img.icons8.com/ios/50/000000/github--v1.png" alt="GithubImage" /></a>
                        <a href={person.Linkedin}><img className='tag' src="https://img.icons8.com/ios/50/000000/linkedin.png" alt="LinkedinImage" /></a>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Footer