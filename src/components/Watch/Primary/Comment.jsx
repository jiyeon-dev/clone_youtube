import {
  CommentBox,
  CommentMain,
  RepliesContainer,
} from '../../../assets/wrappers/Watch/Comment';
import { bindCommentInfo, bindReplyInfo } from '../../../utils/query';
import { formatDate } from '../../../utils/formatter';
import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'; // 좋아요
import { getReplyList } from '../../../utils/youtubeAxios';
import Loader from '../../Loader';

// isReply = 답글인 경우 true
const Comment = ({ item, isReply = false }) => {
  const contentRef = useRef();
  const replyRef = useRef();
  const comment = !isReply ? bindCommentInfo(item) : bindReplyInfo(item);
  const [replies, setReplies] = useState([]);
  const [showLoader, setShowLoader] = useState(false); // 답글 로더

  // 댓글이 4줄 이상인지 체크
  const isLongContent =
    ((comment.textOriginal && comment.textOriginal.match(/\n/g)) || []).length >
    4;

  // 댓글 토글
  const showComment = (e) => {
    const contentEl = contentRef.current;
    if (contentEl.classList.contains('expand')) {
      contentRef.current.classList.remove('expand');
      e.target.innerHTML = '자세히 보기';
    } else {
      contentRef.current.classList.add('expand');
      e.target.innerHTML = '간략히';
    }
  };

  // 답글 토글
  const showReplies = (e) => {
    if (!comment.id) {
      console.error('댓글 id를 찾을 수 없습니다.');
      return;
    }
    e.target.classList.toggle('expand');
    replyRef.current.classList.toggle('none');

    // 열렸을 때, 답글 조회
    if (e.target.classList.contains('expand')) {
      searchReply(comment.id);
    }
  };

  // 답글 조회
  const searchReply = async (commentId) => {
    showLoading(true);
    const response = await getReplyList({
      id: commentId,
    });

    if (response && response.items && response.items[0].replies) {
      const comments = response.items[0].replies.comments;
      setReplies(comments);
    } else {
      setReplies([]);
    }

    showLoading(false);
  };

  const handleLike = () => {
    alert('[클릭] 좋아요');
  };
  const handleDislike = () => {
    alert('[클릭] 싫어요');
  };

  // 답글 로더
  const showLoading = (isShow) => {
    if (isShow) setShowLoader(true);
    else setShowLoader(false);
  };

  return (
    <CommentBox>
      <img
        className="avatar"
        draggable={false}
        src={
          comment.author.img ||
          'https://yt3.ggpht.com/ytc/AIf8zZTiwRGYdwKrt8HfGH6cSYpDAFbSCzj9qPxAWA=s48-c-k-c0x00ffffff-no-rj'
        }
        alt={comment.author.name}
      ></img>

      <CommentMain>
        <div className="header-author">
          <h3>{comment.author.name}</h3>
          <span className="published-time-text">
            {formatDate(comment.publishedAt)}
          </span>
        </div>
        <div className="content">
          <div
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: comment.textDisplay }}
          ></div>
          {isLongContent && (
            <span onClick={(e) => showComment(e)}>자세히 보기</span>
          )}
        </div>

        {/* 댓글 옵셥 */}
        <div className="toolbar">
          <button id="like" onClick={() => handleLike()}>
            <AiOutlineLike size={24} />
          </button>
          <span>{comment.likeCount}</span>
          <button id="dislike" onClick={() => handleDislike()}>
            <AiOutlineDislike size={24} />
          </button>
          <span>{comment.dislikeCount}</span>
          {!isReply && <button id="reply-button">답글</button>}
        </div>

        {/* 답글이 있는 경우에만 노출 */}
        {!isReply && comment.totalReplyCount > 0 && (
          <RepliesContainer>
            <button id="more-replies" onClick={(e) => showReplies(e)}>
              <FaCaretDown />
              답글 {comment.totalReplyCount}개
            </button>
            {showLoader && <Loader />}
            <div ref={replyRef} className="none">
              {replies.map((reply, idx) => {
                return <Comment key={idx} item={reply} isReply={true} />;
              })}
            </div>
          </RepliesContainer>
        )}
      </CommentMain>
    </CommentBox>
  );
};
export default Comment;
