import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { useState } from 'react'



export function Post({ author, publishedAt, content }) {

    const [comment, setComment] = useState(['Post muito bacana!'])

    const [newCommentText, setNewCommentText] = useState('')

    function handleCreateNewComment() {
        event.preventDefault()

        setComment([...comment, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange() {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete) {
        const commentWithOutDeleteOne = comment.filter(comments => {
            return (
                comments != commentToDelete
            )
        })
        setComment(commentWithOutDeleteOne);

    }


    const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    const isNewCommentEmpty = newCommentText.length == 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.autor}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.autorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.contents}>
                {content.map(line => {
                    if (line.type == 'paragraph') {
                        return (
                            <p key={line.content}>{line.content}</p>
                        )
                    } else
                        return (
                            <p key={line.content}>👉{'  '}<a href='#'>{line.content}</a></p>
                        )
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu Feedback </strong>
                <textarea
                    required
                    onInvalid={handleNewCommentInvalid}
                    name='comment'
                    placeholder='Deixe uma mensagem'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                />

                <footer>
                    <button
                        type='submit'
                        disabled={isNewCommentEmpty}
                    >
                        Comentar
                    </button>
                </footer>

            </form>
            <div className={styles.commentList}>
                {comment.map(comments => {
                    return (
                        <Comment
                            key={comments}
                            content={comments}
                            OnDeleteComment={deleteComment}
                        />
                    )
                })}

            </div>
        </article>
    )
}