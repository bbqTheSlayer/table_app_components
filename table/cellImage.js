import React, { Component } from 'react';

export default class CellImage extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {

        };
    }

    getProperty(PropertyName, DefaultValue)
    {
        if (   typeof this.props[PropertyName] == 'undefined'
            || this.props[PropertyName] == null
        ) {
            return DefaultValue;
        } else {
            return this.props[PropertyName];
        }
    }

    getClassString()
    {
        const ClassArray = this.getProperty('ClassArray', []);

        return ClassArray.join(' ');
    }

    render()
    {
        return (
            <img className={this.getClassString()}
                 src={this.getProperty('ImagePath', '')}
                 alt={this.getProperty('AttrAlt', '')}
                 ></img>
        )
    }
}