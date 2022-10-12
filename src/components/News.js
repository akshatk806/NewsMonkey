import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    constructor(){
        super();
        console.log("Hello I am a constructor from news component");

        // Setting the state
        this.state={          

        }
    }

    render() {
        return (
            <div className='container'>
                <h1>NewsMonkey - Top Headlines</h1>
                <div className="row">
                    <div className="col-md-4">
                        <Newsitem title="myTitle" description="myDescription" imageURL="https://images.indianexpress.com/2022/10/saurav-ganguly-1200-1.jpg" newsURL="https://www.ndtv.com/india-news/can-you-identify-chief-minister-president-asks-tea-workers-heres-why-3424868"/>
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