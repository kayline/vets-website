import React from 'react';
import PropTypes from 'prop-types';
import DeleteDraft from '../Draft/DeleteDraft';

const ComposeFormActionButtons = ({
  onSend,
  onSaveDraft,
  formPopulated,
  setDeleteButtonClicked,
  cannotReply,
  draftBody,
  draftId,
  draftsCount,
  navigationError,
  refreshThreadCallback,
  setNavigationError,
  setUnsavedNavigationError,
  messageBody,
  draftSequence,
  setHideDraft,
  setIsEditing,
  savedComposeDraft,
}) => {
  return (
    <div className="compose-form-actions vads-u-display--flex vads-u-flex--1">
      {!cannotReply && (
        <va-button
          text={`Send${draftSequence ? ` draft ${draftSequence}` : ''}`}
          id={`send-button${draftSequence ? `-${draftSequence}` : ''}`}
          class={`
            small-screen:vads-u-flex--1
            small-screen:vads-u-margin-bottom--0
            small-screen:vads-u-margin-right--1
            vads-u-margin-bottom--2
            vads-u-margin-right--0
            vads-u-margin-top--0
            vads-u-width--full
          `}
          data-testid={`send-button${draftSequence ? `-${draftSequence}` : ''}`}
          data-dd-action-name={`send-button${
            draftSequence ? `-${draftSequence}` : ''
          }`}
          onClick={onSend}
        />
      )}
      {!cannotReply && (
        <button
          type="button"
          id={`save-draft-button${draftSequence ? `-${draftSequence}` : ''}`}
          className={`
            save-draft-button
            usa-button
            usa-button-secondary
            vads-u-margin-bottom--2
            vads-u-margin-right--0
            vads-u-margin-top--0
            vads-u-padding-x--0p5
            vads-u-width--full
            xsmall-screen:vads-u-flex--1
            xsmall-screen:vads-u-margin-bottom--0
            xsmall-screen:vads-u-margin-right--1
          `}
          data-testid={`save-draft-button${
            draftSequence ? `-${draftSequence}` : ''
          }`}
          onClick={e => onSaveDraft('manual', e)}
        >
          Save draft {draftSequence}
        </button>
      )}
      {/* UCD requested to keep button even when not saved as draft */}
      <DeleteDraft
        draftId={draftId}
        draftsCount={draftsCount}
        draftBody={draftBody}
        formPopulated={formPopulated}
        navigationError={navigationError}
        refreshThreadCallback={refreshThreadCallback}
        setNavigationError={setNavigationError}
        setUnsavedNavigationError={setUnsavedNavigationError}
        setDeleteButtonClicked={setDeleteButtonClicked}
        cannotReply={cannotReply}
        messageBody={messageBody}
        draftSequence={draftSequence}
        setHideDraft={setHideDraft}
        setIsEditing={setIsEditing}
        savedComposeDraft={savedComposeDraft}
      />
    </div>
  );
};

ComposeFormActionButtons.propTypes = {
  cannotReply: PropTypes.bool,
  draftBody: PropTypes.string,
  draftId: PropTypes.number,
  draftSequence: PropTypes.number,
  draftsCount: PropTypes.number,
  formPopulated: PropTypes.bool,
  isModalVisible: PropTypes.bool,
  messageBody: PropTypes.string,
  navigationError: PropTypes.object,
  refreshThreadCallback: PropTypes.func,
  savedComposeDraft: PropTypes.bool,
  savedForm: PropTypes.bool,
  setDeleteButtonClicked: PropTypes.func,
  setHideDraft: PropTypes.func,
  setIsEditing: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setNavigationError: PropTypes.func,
  setUnsavedNavigationError: PropTypes.func,
  onSaveDraft: PropTypes.func,
  onSend: PropTypes.func,
};

export default ComposeFormActionButtons;
