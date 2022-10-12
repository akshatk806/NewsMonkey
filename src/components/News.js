import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    constructor() {
        super();
        console.log("Hello I am a constructor from news component");

        // Setting the state
        this.state = {
            articles: []
        }

    }

    async componentDidMount(){
        // console.log("componentDidMount method started")

        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=c1165d9147f145c19dcd22265569e78b";
        let response=await fetch(url);
        // console.log(response);
        let data=await response.json();
        // console.log(data);

        this.setState({
            articles:data.articles
        })
    }

    render() {
        // console.log("Render method started");
        return (
            <div className='container'>
                <h1>NewsMonkey - Top Headlines</h1>

                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageURL={element.urlToImage} newsURL={element.url} />
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default News