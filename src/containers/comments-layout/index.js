import { memo, useState } from "react";
import Comment from "../../components/comment";
import TitleComment from "../../components/title-comment";
import CommentLogIn from "../../components/comment-log-in";
import useSelector from "../../hooks/use-selector";
import CommentForm from "../../components/comment-form";
import { useDispatch } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function CommentsLayout({comments, idArticle, t}) {

  const exists = useSelector(state => state.session.exists);


  const [openLogInText, setOpenLogInText] = useState('false');
  const [openFormComment, setOpenFormComment] = useState('false');
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    profile: state.session.user.profile?.name
  }));

  const onChangeLogInText = (e) => {
    setOpenLogInText(e.target.value);
  }

  const onChangeOpenFormComment = (e) => {
    setOpenFormComment(e.target.value);
  }

  const postFormComment = (data) => {
    if (!data.parent._id) {
      dispatch(commentsActions.postComments({...data, parent: {_id: idArticle, _type: "article"}}, select.profile))
    } else {
      dispatch(commentsActions.postComments(data, select.profile))
      setOpenFormComment('false');
    }
  }

  const newCommentsList = treeToList(listToTree(comments), (item, level) => {
    return (
      <Comment
        key={item._id}
        id={item._id}
        user={item?.author?.profile?.name}
        date={item.dateCreate}
        text={item.text}
        indent={(level > 1 && level <= 4) ? level * 30 + 10 : level > 4 ? 150 : 40}
        openLogInText={openLogInText}
        onChangeLogInText={onChangeLogInText}
        exists={exists}
        onChangeOpenFormComment={onChangeOpenFormComment}
        openFormComment={openFormComment}
        hand2={postFormComment}
        t={t}
      />
    )
  });

  return (
    <>
      <TitleComment count={comments.length} t={t}/>
      {newCommentsList.map((item, key) => key ? (item) : '')}
      {
        openLogInText === 'false' ? <CommentLogIn exists={exists} type={openLogInText} t={t}/> : null
      }
      {
        openFormComment === 'false' ? <CommentForm exists={exists} title={t('comment.newComment.title')} hand={postFormComment} t={t}/> : null
      }

    </>
  )
}

export default memo(CommentsLayout)