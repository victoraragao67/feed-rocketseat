import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

export function Comment(props) {

    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        });
    }

    function handleDeleteComment(){
        props.OnDeleteComment(props.content)

    }

    return (
        <div className={styles.comment}>
            <Avatar
                hasBorder={false}
                src='https://avatars.githubusercontent.com/u/94937372?v=4'
            />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Victor Aragão</strong>
                            <time title="24 de maio às 20:30h" dateTime="2023-05-24 20:30:00">
                                Cerca de 1h atrás
                            </time>
                        </div>
                        <button 
                        title='Deletar'
                        onClick={handleDeleteComment}
                        >
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{props.content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={20} />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}