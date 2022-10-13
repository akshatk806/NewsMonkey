import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'

export class News extends Component {
    constructor() {
        super();
        // console.log("Hello I am a constructor from news component");

        // Setting the state
        this.state = {
            articles: [],
            page:1,
            loading:false
        }

    }

    async componentDidMount(){
        // console.log("componentDidMount method started")

        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=c1165d9147f145c19dcd22265569e78b&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let response=await fetch(url);
        // console.log(response);
        let data=await response.json();
        // console.log(data);

        this.setState({
            articles:data.articles,
            totalResults:data.totalResults,
            loading:false
        })
    }

    handlePrevClick=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=c1165d9147f145c19dcd22265569e78b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let response=await fetch(url);
        let data=await response.json();
        this.setState({
            page:this.state.page-1,
            articles:data.articles,
            loading:false
        })
    }

    handleNextClick=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=c1165d9147f145c19dcd22265569e78b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let response=await fetch(url);
        let data=await response.json();
        this.setState({
            page:this.state.page+1,
            articles:data.articles,
            loading:false
        })
    }

    render() {
        // console.log("Render method started");
        return (
            <div className='container my-3'>
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner />}   {/* If the first condtion is true then only the second statement will checked*/}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageURL={element.urlToImage} newsURL={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News