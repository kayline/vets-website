import React from 'react';
import Scroll from 'react-scroll';
import _ from 'lodash';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import scrollTo from 'platform/utilities/ui/scrollTo';
import scrollToTop from 'platform/utilities/ui/scrollToTop';

import DueDate from '../components/DueDate';
import AskVAQuestions from '../components/AskVAQuestions';
import AddFilesForm from '../components/AddFilesForm';
import Notification from '../components/Notification';
import ClaimsBreadcrumbs from '../components/ClaimsBreadcrumbs';
import { setPageFocus, setUpPage } from '../utils/page';
import {
  addFile,
  removeFile,
  submitFiles,
  resetUploads,
  updateField,
  cancelUpload,
  // START lighthouse_migration
  getClaim as getClaimAction,
  getClaimDetail as getClaimEVSSAction,
  // END lighthouse_migration
  setFieldsDirty,
  clearNotification,
} from '../actions';
// START lighthouse_migration
import { cstUseLighthouse } from '../selectors';
// END lighthouse_migration

const scrollToError = () => {
  const options = _.merge({}, window.VetsGov.scroll, { offset: -25 });
  scrollTo('uploadError', options);
};
const { Element } = Scroll;

class DocumentRequestPage extends React.Component {
  componentDidMount() {
    this.props.resetUploads();
    if (this.props.trackedItem) {
      document.title = `Request for ${this.props.trackedItem.displayName}`;
    } else {
      document.title = 'Document Request';
    }
    if (!this.props.loading) {
      setUpPage();
    } else {
      scrollToTop();
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    if (!props.loading && !props.trackedItem) {
      this.props.router.replace(`/your-claims/${this.props.params.id}/status`);
    }
    if (props.uploadComplete) {
      this.goToFilesPage();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.message && !prevProps.message) {
      document.querySelector('.claims-alert').focus();
      scrollToError();
    }
    if (!this.props.loading && prevProps.loading) {
      setPageFocus();
    }
  }

  componentWillUnmount() {
    if (!this.props.uploadComplete) {
      this.props.clearNotification();
    }
  }

  goToFilesPage() {
    // START lighthouse_migration
    if (this.props.useLighthouse) {
      this.props.getClaimLighthouse(this.props.claim.id);
    } else {
      this.props.getClaimEVSS(this.props.claim.id);
    }
    // END lighthouse_migration
    this.props.router.push(`your-claims/${this.props.claim.id}/files`);
  }

  render() {
    let content;
    const filesPath = `your-claims/${this.props.params.id}/files`;
    const { trackedItem } = this.props;

    if (this.props.loading) {
      content = (
        <va-loading-indicator
          set-focus
          message="Loading your claim information..."
        />
      );
    } else {
      const { message } = this.props;

      content = (
        <>
          {message && (
            <div>
              <Element name="uploadError" />
              <Notification
                title={message.title}
                body={message.body}
                type={message.type}
              />
            </div>
          )}
          <h1 className="claims-header">{trackedItem.displayName}</h1>
          {trackedItem.type.endsWith('you_list') ? (
            <DueDate date={trackedItem.suspenseDate} />
          ) : null}
          {trackedItem.type.endsWith('others_list') ? (
            <div className="optional-upload">
              <p>
                <strong>Optional</strong> - We’ve asked others to send this to
                us, but you may upload it if you have it.
              </p>
            </div>
          ) : null}
          <p>{trackedItem.description}</p>
          <AddFilesForm
            field={this.props.uploadField}
            progress={this.props.progress}
            uploading={this.props.uploading}
            files={this.props.files}
            backUrl={this.props.lastPage || filesPath}
            onSubmit={() =>
              this.props.submitFiles(
                this.props.claim.id,
                this.props.trackedItem,
                this.props.files,
              )
            }
            onAddFile={this.props.addFile}
            onRemoveFile={this.props.removeFile}
            onFieldChange={this.props.updateField}
            onCancel={this.props.cancelUpload}
            onDirtyFields={this.props.setFieldsDirty}
          />
        </>
      );
    }

    const docRequest = this.props.loading ? (
      <span>Document request</span>
    ) : (
      <Link
        to={`your-claims/${this.props.params.id}/document-request/${
          trackedItem.id
        }`}
      >
        Document request
      </Link>
    );

    return (
      <div>
        <div name="topScrollElement" />
        <div className="vads-l-grid-container large-screen:vads-u-padding-x--0">
          <div className="vads-l-row vads-u-margin-x--neg1p5 medium-screen:vads-u-margin-x--neg2p5">
            <div className="vads-l-col--12">
              <ClaimsBreadcrumbs>
                <Link to={filesPath}>Status details</Link>
                {docRequest}
              </ClaimsBreadcrumbs>
            </div>
          </div>
          <div className="vads-l-row vads-u-margin-x--neg2p5">
            <div className="vads-l-col--12 vads-u-padding-x--2p5 medium-screen:vads-l-col--8">
              {content}
            </div>
            <div className="vads-l-col--12 vads-u-padding-x--2p5 medium-screen:vads-l-col--4 help-sidebar">
              <AskVAQuestions />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const claimsState = state.disability.status;
  let trackedItem = null;
  if (claimsState.claimDetail.detail) {
    trackedItem = claimsState.claimDetail.detail.attributes.eventsTimeline.filter(
      event =>
        event.trackedItemId === parseInt(ownProps.params.trackedItemId, 10),
    )[0];
  }
  return {
    loading: claimsState.claimDetail.loading,
    claim: claimsState.claimDetail.detail,
    trackedItem,
    files: claimsState.uploads.files,
    uploading: claimsState.uploads.uploading,
    progress: claimsState.uploads.progress,
    uploadError: claimsState.uploads.uploadError,
    uploadComplete: claimsState.uploads.uploadComplete,
    uploadField: claimsState.uploads.uploadField,
    lastPage: claimsState.routing.lastPage,
    message: claimsState.notifications.message,
    // START lighthouse_migration
    useLighthouse: cstUseLighthouse(state),
    // END lighthouse_migration
  };
}

const mapDispatchToProps = {
  addFile,
  removeFile,
  submitFiles,
  updateField,
  cancelUpload,
  // START lighthouse_migration
  getClaimEVSS: getClaimEVSSAction,
  getClaimLighthouse: getClaimAction,
  // END lighthouse_migration
  setFieldsDirty,
  resetUploads,
  clearNotification,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DocumentRequestPage),
);

DocumentRequestPage.propTypes = {
  addFile: PropTypes.func,
  cancelUpload: PropTypes.func,
  claim: PropTypes.object,
  clearNotification: PropTypes.func,
  files: PropTypes.array,
  // START lighthouse_migration
  getClaimEVSS: PropTypes.func,
  getClaimLighthouse: PropTypes.func,
  // END lighthouse_migration
  loading: PropTypes.bool,
  message: PropTypes.object,
  params: PropTypes.object,
  removeFile: PropTypes.func,
  resetUploads: PropTypes.func,
  setFieldsDirty: PropTypes.func,
  submitFiles: PropTypes.func,
  trackedItem: PropTypes.object,
  updateField: PropTypes.func,
  uploading: PropTypes.bool,
  // START lighthouse_migration
  useLighthouse: PropTypes.bool,
  // END lighthouse_migration
};

export { DocumentRequestPage };
