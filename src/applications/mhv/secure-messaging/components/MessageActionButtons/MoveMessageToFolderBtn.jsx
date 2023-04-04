import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  VaModal,
  VaRadio,
  VaRadioOption,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { moveMessageThread } from '../../actions/messages';
import { getFolders, newFolder } from '../../actions/folders';
import { navigateToFolderByFolderId } from '../../util/helpers';
import * as Constants from '../../util/constants';
import { addAlert } from '../../actions/alerts';
import CreateFolderModal from '../Modals/CreateFolderModal';

const MoveMessageToFolderBtn = props => {
  const { threadId, allFolders, isVisible, activeFolder } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [folderInputError, setFolderInputError] = useState(null);
  const [updatedFoldersList, setUpdatedFolderList] = useState([]);

  useEffect(
    () => {
      dispatch(getFolders);
      const abortCont = new AbortController();
      return () => abortCont.abort();
    },
    [dispatch],
  );

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedFolder(null);
    setFolderInputError(null);
  };

  const handleOnChangeFolder = ({ target }) => {
    setSelectedFolder(target.value);
  };

  const handleConfirmMoveFolderTo = () => {
    if (selectedFolder === null) {
      setFolderInputError('Please select a folder to move the message to.');
    } else {
      if (selectedFolder === 'newFolder') {
        setIsNewModalVisible(true);
      } else if (selectedFolder !== null) {
        dispatch(moveMessageThread(threadId, selectedFolder)).then(() => {
          navigateToFolderByFolderId(
            activeFolder
              ? activeFolder.folderId
              : Constants.DefaultFolders.INBOX.id,
            history,
          );
          dispatch(
            addAlert(
              Constants.ALERT_TYPE_SUCCESS,
              '',
              Constants.Alerts.Message.MOVE_MESSAGE_THREAD_SUCCESS,
            ),
          );
        });
      }
      closeModal();
    }
  };

  useEffect(
    () => {
      setUpdatedFolderList(
        allFolders.filter(
          folder =>
            folder.id !== activeFolder?.folderId &&
            folder.id !== Constants.DefaultFolders.DRAFTS.id &&
            folder.id !== Constants.DefaultFolders.SENT.id,
        ),
      );
    },
    [allFolders, activeFolder],
  );

  const moveToFolderModal = () => {
    return (
      <div
        className="message-actions-buttons-modal"
        data-testid="message-actions-buttons-modal"
      >
        <VaModal
          id="move-to-modal"
          data-testid="move-to-modal"
          large
          modalTitle="Move to:"
          onPrimaryButtonClick={handleConfirmMoveFolderTo}
          onSecondaryButtonClick={closeModal}
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
          onCloseEvent={closeModal}
          visible={isModalVisible}
        >
          <p>
            This conversation will be moved. Any replies to this message will
            appear in your inbox
          </p>
          <VaRadio
            className="form-radio-buttons"
            required
            enable-analytics
            error={folderInputError}
            onRadioOptionSelected={handleOnChangeFolder}
          >
            {updatedFoldersList &&
              updatedFoldersList.map((folder, i) => (
                <>
                  <VaRadioOption
                    data-testid={`radiobutton-${folder.name}`}
                    key={i}
                    id={`radiobutton-${folder.name}`}
                    // checking if the folder is the trash folder, as the name on the backend is 'Deleted' instead of 'Trash'
                    label={
                      folder.id === Constants.DefaultFolders.DELETED.id
                        ? Constants.DefaultFolders.DELETED.header
                        : folder.name
                    }
                    name="defaultName"
                    value={folder.id}
                  />
                </>
              ))}
            <>
              <VaRadioOption
                data-testid="folder-list-radio-button"
                id="radiobutton-newFolder"
                label="Create new folder"
                name="defaultName"
                value="newFolder"
              />
            </>
          </VaRadio>
          <p /> {/* to create extra margin between radio and action buttons */}
        </VaModal>
      </div>
    );
  };

  const confirmCreateFolder = (folderName, closeNewModal) => {
    dispatch(newFolder(folderName))
      .then(createdFolder =>
        dispatch(moveMessageThread(threadId, createdFolder.folderId)),
      )
      .finally(() => closeNewModal());
  };

  return (
    isVisible && (
      <li>
        <button
          type="button"
          className="usa-button-secondary"
          onClick={openModal}
        >
          <i
            className="fas fa-folder vads-u-margin-right--0p5"
            aria-hidden="true"
          />
          <span
            className="message-action-button-text"
            data-testid="move-button-text"
          >
            Move
          </span>
        </button>
        {isModalVisible ? moveToFolderModal() : null}
        {isNewModalVisible && (
          <CreateFolderModal
            isModalVisible={isNewModalVisible}
            setIsModalVisible={setIsNewModalVisible}
            onConfirm={confirmCreateFolder}
            folders={updatedFoldersList}
          />
        )}
      </li>
    )
  );
};

MoveMessageToFolderBtn.propTypes = {
  activeFolder: PropTypes.object,
  allFolders: PropTypes.array,
  isVisible: PropTypes.bool,
  threadId: PropTypes.number,
};

export default MoveMessageToFolderBtn;
