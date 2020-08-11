import React from 'react';
import { Image } from 'react-native'

class SerieImage extends React.Component {

    isBase64(){
        const base64regex = /[A-Za-z0-9+/=]/;
        return base64regex.test(this.props.uri) 
    }

    render(){
        if (!this.props.img64 && !this.props.img){
            return null
        }

        let uri = '';

        if (this.props.img64){
            uri = 'data:image/png;base64,' + this.props.img64
        } else {
            uri = this.props.img
        }

        return (
            <Image
                source={{ uri : uri }}
                aspectRatio={1}
                resizeMode="cover"
                style={this.props.style} />
        )
    }

}

export default SerieImage;