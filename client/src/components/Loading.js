import React from 'react';

import ReactLoading from 'react-loading';

import { connect } from 'react-redux';

const Loading = (props) => {

    const outerStyle = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        background: 'rgba(0, 0, 0, 0.8)',
        zIndex: 10000
    }

    const innerStyle = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white'
    }

    if (props.loadingReasons.length <= 0) return <></>

    return (
        <div style={outerStyle}>
            <div style={innerStyle}>
                {
                    props.loadingReasons.map((element, index) => {
                        return (
                            <p key={index} style={{ fontSize: '18pt' }}>{element}</p>
                        )
                    })
                }
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1 1' }}></div>
                    <ReactLoading color="#fff" type="spinningBubbles" width="96px" height="96px" />
                    <div style={{ flex: '1 1' }}></div>
                </div>

            </div>
        </div>
    );

}

const mapStateToProps = (state) => ({
    loadingReasons: state.loadingReasons
})



export default connect(mapStateToProps)(Loading);