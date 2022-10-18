import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let { title, description, imageURL, newsURL, author, date, source } = this.props;       // destructuring
        return (
            <div className="my-3">
                <div className="card">
                    <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
                        <span className="badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </div>

                    <img src={imageURL} className="card-img-top" alt={title} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}.....</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsURL} target="_blank" rel="noreferrer noopener" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem