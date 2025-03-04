import styles from './CustomerReviews.module.css';

const CustomerReviews = () => {
    const testimonials = [
        {
            title: "Amazing tool! Saved me months",
            description: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
            author: "John Master",
            position: "Director, Spark.com",
        },
        {
            title: "Amazing tool! Saved me months",
            description: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
            author: "John Master",
            position: "Director, Spark.com",
        },
        {
            title: "Amazing tool! Saved me months",
            description: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
            author: "John Master",
            position: "Director, Spark.com",
        },
        {
            title: "Amazing tool! Saved me months",
            description: "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
            author: "John Master",
            position: "Director, Spark.com",
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.topHeading}>
                    Here&apos;s what our <span style={{ color: '#1DA35E' }}>customer  </span>
                    has to says
                </div>
                <div className={styles.btn}>
                    Read customer stories
                </div>
            </div>
            <div className={styles.bottom}>
                {testimonials.map((testimonial, index) => (
                    <div className={`${styles.card} ${index === 0 || index === testimonials.length - 1 ? styles.greyBack : styles.whiteBack}`} key={index}>
                        <div className={styles.heading}>{testimonial.title}</div>
                        <div className={styles.desc}>{testimonial.description}</div>
                        <div className={styles.dFlex}>
                            <div className={styles.green}></div>
                            <div>
                                <div className={styles.author}>{testimonial.author}</div>
                                <div className={styles.position}>{testimonial.position}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerReviews;