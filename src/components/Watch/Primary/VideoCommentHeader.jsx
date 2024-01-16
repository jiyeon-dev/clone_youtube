import {
  AddCommentContainer,
  CommentHeader,
  DropDown,
  ToolTip,
  CommentBoxButtons,
} from '../../../assets/wrappers/Watch/Comment';
import { BsFilterLeft } from 'react-icons/bs';
import { useRef, useEffect, useState } from 'react';

const VideoCommentHeader = () => {
  const [comment, setComment] = useState(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const dropdownContentRef = useRef();
  const commentBox = useRef();
  const submitButton = useRef();

  const openDropDown = () => {
    dropdownContentRef.current.classList.toggle('show');
  };
  const closeDropDown = () => {
    dropdownContentRef.current.classList.remove('show');
  };

  useEffect(() => {
    // bind dropdown events
    if (dropdownContentRef.current) {
      const menuItems = dropdownContentRef.current.querySelectorAll('div');
      menuItems.forEach((element) => {
        element.addEventListener('click', (e) => {
          menuItems.forEach((el) => el.classList.remove('selected'));
          e.target.classList.add('selected');
          // TODO: re-search comments
          console.log(`search = ${e.target.dataset.order}`);
          closeDropDown();
        });
      });

      // dropdown 외부 클릭 시 닫기
      window.onclick = function (e) {
        if (
          !e.target.matches('.dropdown-button') &&
          dropdownContentRef.current.classList.contains('show')
        ) {
          dropdownContentRef.current.classList.remove('show');
        }
      };
    }
  }, [dropdownContentRef.current]);

  const toggleCommentContainer = () => {
    if (!isCommentOpen) setIsCommentOpen(true);
  };
  const cancelComment = () => {
    commentBox.current.innerHTML = '';
    setComment(null);
    setIsCommentOpen(false);
  };
  const submitComment = () => {
    alert('댓글 추가');
    console.log(comment);
  };
  const handleInputComment = (e) => {
    const newValue = e.currentTarget.textContent;
    setComment(newValue);

    // 등록 버튼 비활성화
    submitButton.current.disabled =
      !newValue && newValue.trim().length === 0 ? true : false;
  };

  return (
    <CommentHeader>
      <div className="title">
        <h2>댓글 5,023개</h2>
        <DropDown className="dropdown">
          <div className="dropdown-button" onClick={() => openDropDown()}>
            <BsFilterLeft size={24} />
            정렬 기준
            <ToolTip className="tooltip">댓글 정렬</ToolTip>
          </div>
          <div className="dropdown-content" ref={dropdownContentRef}>
            <div data-order="relevance" className="selected">
              인기 댓글순
            </div>
            <div data-order="time">최신순</div>
          </div>
        </DropDown>
      </div>
      <AddCommentContainer>
        <img className="avatar"></img>
        <div
          ref={commentBox}
          className="comment"
          contentEditable={true}
          onClick={() => toggleCommentContainer()}
          onInput={(e) => handleInputComment(e)}
          suppressContentEditableWarning={true}
          //   dangerouslySetInnerHTML={{ __html: comment.html }}
        ></div>
      </AddCommentContainer>
      {isCommentOpen && (
        <CommentBoxButtons>
          <button className="cancel" onClick={() => cancelComment()}>
            취소
          </button>
          <button
            ref={submitButton}
            className="submit"
            disabled
            onClick={() => submitComment()}
          >
            등록
          </button>
        </CommentBoxButtons>
      )}
    </CommentHeader>
  );
};
export default VideoCommentHeader;
