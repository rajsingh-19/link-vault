import styles from './Links.module.css';
import audiomack from '../../../assets/audiomack.svg';
import Bandsintown from '../../../assets/Bandsintown.svg';
import Bonfire from '../../../assets/Bonfire.svg';
import Books from '../../../assets/Books.svg';
import buy from '../../../assets/Buy Me A Gift.svg';
import Cameo from '../../../assets/Cameo.svg';
import Clubhouse from '../../../assets/Clubhouse.svg';
import Community from '../../../assets/Community.svg';
import contact from '../../../assets/Contact Details.svg';

const Links = () => {

    const integrations = [
        {
            name: "Audiomack",
            description: "Add an Audiomack player to your Linktree",
            image: audiomack
        },
        {
            name: "Bandsintown",
            description: "Drive ticket sales by listing your events",
            image: Bandsintown
        },
        {
            name: "Bonfire",
            description: "Display and sell your custom merch",
            image: Bonfire
        },
        {
            name: "Books",
            description: "Promote books on your Linktree",
            image: Books
        },
        {
            name: "Buy Me A Gift",
            description: "Let visitors support you with a small gift",
            image: buy
        },
        {
            name: "Cameo",
            description: "Make impossible fan connections possible",
            image: Cameo
        },
        {
            name: "Clubhouse",
            description: "Let your community in on the conversation",
            image: Clubhouse
        },
        {
            name: "Community",
            description: "Build an SMS subscriber list",
            image: Community
        },
        {
            name: "Contact Details",
            description: "Easily share downloadable contact details",
            image: contact
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.heading}>All Link Apps and Integrations</div>
            <div className={styles.links}>
                {integrations.map((integration, index) => (
                    <div key={index} className={styles.link}>
                        <img src={integration.image} alt="" />
                        <div>
                            <div className={styles.name}>{integration.name}</div>
                            <div className={styles.description}>{integration.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Links;