import React from 'react'
import Files from 'react-files'



class FileDrop extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      files: []
    }
  }

  onFilesChange = (files) => {
    this.setState({
      files
    }, () => {
      console.log("küldés előtt:",this.state.files)
      this.props.setSelFile(this.state.files)
   
    })
  }

  onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
    this.props.setMsg('error code ' + error.code + ': ' + error.message)
  }

  render () {
    return (
            <div className="files">
              <Files
                className='files-dropzone'
                onChange={this.onFilesChange}
                onError={this.onFilesError}
                accepts={['image/png','image/jpeg','image/gif','image/ico','image/jpg'/*, '.pdf', 'audio/*'*/]}
                /*multiple*/
                maxFileSize={1000000}
                minFileSize={0}
                clickable
              >
            <div className="drop-holder d-flex align-items-center">
                 <div className="btn btn-outline-primary drop-btn" onClick={() => this.props.setMsg('')}>Drop images here</div>
                {this.state.files.length > 0 && (
                    <div className='files-gallery d-flex'>
                        {this.state.files.map((file) =>
                            <img className='files-gallery-item img-fluid' src={file.preview.url} key={file.id} />
                        )}
                        </div>
                )}
            </div>
              
              </Files>
            </div>
          )
  }
}

export default FileDrop