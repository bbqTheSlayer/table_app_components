import React, { Component } from 'react';

export default class Curtain extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }


    getCurtainSet()
    {
        if (   (typeof this.props.CurtainSet == 'object')
            && (Array.isArray(this.props.CurtainSet))
        ) {
            return this.props.CurtainSet;
        } else {
            return [];
        }
    }


    getCallbackSet()
    {
        return this.props.CallbackSet;
    }


    renderCurtain(Item, i)
    {
        const ClassArray = ['curtain-block', 'flex', 'flex-center'];

        const ClassString = ClassArray.join(' ');

        const Content = this.getCallbackSet()[Item.ContentCallback]();

        return (
            <div
              key={'key_' + Item.AttrID}
              className={ClassString}
              >
                {Content}
            </div>
        )
    }


    renderCurtains()
    {
        const CurtainSet = this.getCurtainSet();

        return CurtainSet.map((Item, i) => {
            return this.renderCurtain(Item, i);
        });
    }


    render()
    {
        const Curtains = this.renderCurtains();

        return (
            <>
            {Curtains}
            </>
        );
    }
}