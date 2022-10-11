import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey - Top Headlines</h1>
                <div className="row">
                    <div className="col-md-4">
                        <Newsitem title="myTitle" description="myDescription" />
                    </div>
                    <div className="col-md-4">
                        <Newsitem />
                    </div> 
                    <div className="col-md-4">
                        <Newsitem />
                    </div>
                </div>
            </div>
        )
    }
}

export default News