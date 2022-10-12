import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let { title, description, imageURL, newsURL} = this.props;       // destructuring
        return (
            <div className="my-3">
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imageURL} className="card-img-top" alt={title} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}.....</p>
                        <a href={newsURL} target="_blank" rel="noreferrer noopener" className="btn btn-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem