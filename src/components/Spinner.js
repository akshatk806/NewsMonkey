import React, { Component } from 'react'
import loading_spinner from './loading.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img className="my-3" src={loading_spinner} alt="loading...." />
            </div>
        )
    }
}

export default Spinner