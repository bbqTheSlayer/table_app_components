import React, { Component, createElement } from 'react';

import CellText from './cellText';

import CellButton from './cellButton';

import CellImage from './cellImage';

import CellCheckbox from './cellCheckbox';

export default class Table extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {};
    }


    getColumnList()
    {
        const ColumnList = this.props.ColumnList;

        let Out = [];

        for (let key in ColumnList) {
            Out.push(ColumnList[key]);
        }

        return Out;
    }


    prepareTableHeader()
    {
        let Columns = this.getColumnList();

        return Columns.map((Current, index) => {
            return (
                <th key={'header_column_' + index}>{Current.ColumnLabel}</th>
            );
        });
    }


    getDataSet()
    {
        if (typeof this.props.TableDataSet == 'object') {
            return this.props.TableDataSet;
        } else {
            return [];
        }
    }


    onEditButtonClick(id)
    {
        this.props.onEditButtonClick(id);
    }


    onRemoveButtonClick(id)
    {
        this.props.onRemoveButtonClick(id);
    }


    createTextCell(Data)
    {
        return (
            <CellText
              KeyProp={Data.Key}
              ClassArray={Data.ClassArray}
              Text={Data.Caption}
              />
        );
    }


    createButton(Data)
    {
        return (
            <CellButton
              KeyProp={Data.Key}
              ClassArray={Data.ClassArray}
              Caption={Data.Caption}
              onClick={Data.onClick}
              IsDisabled={Data.IsDisabled}
              RowData={Data.RowData}
              ></CellButton>
        )
    }


    createCheckbox(data)
    {
        return (
            <CellCheckbox
              KeyProp={data.Key}
              ClassArray={data.ClassArray}
              onClick={data.onClick}
              IsDisabled={data.IsDisabled}
              RowData={data.RowData}
              />
        )
    }


    createImage(Data)
    {
        return (
            <CellImage
              KeyProp={Data.Key}
              ClassArray={Data.ClassArray}
              ImagePath={Data.ImagePath}
              AttrAlt={Data.AttrAlt}
              />
        )
    }


    getCallbackSet()
    {
        if (typeof this.props.CallbackSet == 'object') {
            return this.props.CallbackSet;
        } else {
            return {};
        }
    }


    createCellElement(CellContentElemConfig, RowData)
    {
        const Key =   'td_elem'
                    + '_' + RowData.RowIndex
                    + '_' + RowData.ColIndex
                    + '_' + RowData.CellElemIndex;

        const CallbackSet = this.getCallbackSet();

        const Data = RowData;

        switch (CellContentElemConfig.ContentType) {
            case 'button':
                const Caption = CallbackSet[CellContentElemConfig.captionController](RowData);

                const IsDisabled = CallbackSet[CellContentElemConfig.disabledController](RowData);

                return this.createButton(
                    {
                        Key: Key,
                        ClassArray: CellContentElemConfig.ClassArray,
                        Caption: Caption,
                        IsDisabled: IsDisabled,
                        onClick: CallbackSet[CellContentElemConfig.clickController],
                        RowData: Data
                    }
                );
            
            case 'image':
                return this.createImage(
                    {
                        Key: Key,
                        ClassArray: CellContentElemConfig.ClassArray,
                        ImagePath: RowData[CellContentElemConfig.DSColumn],
                        AttrAlt: RowData[CellContentElemConfig.AttrAlt]
                    }
                );

            case 'checkbox':
                    return this.createCheckbox(
                        {
                            Key: Key,
                            ClassArray: CellContentElemConfig.ClassArray,
                            IsDisabled: IsDisabled,
                            onClick: CallbackSet[CellContentElemConfig.clickController],
                            RowData: Data
                        }
                    );

            default:
                return this.createTextCell(
                    {
                        Key: Key,
                        ClassArray: CellContentElemConfig.ClassArray,
                        Caption: RowData[CellContentElemConfig.DSColumn]
                    }
                );
        }
    }


    createCellContent(CellContentConfig, RowData)
    {
        return CellContentConfig.map((CellContentElem, i) => {
            let Data = RowData;

            Data.CellElemIndex = i;

            return this.createCellElement(CellContentElem, Data);
        });
    }


    createColumns(
        Config,
        RowData
    ) {
        return Config.map((CellElement, i) => {

            let Data = RowData;

            Data.ColIndex = i;

            const CellContent = this.createCellContent(CellElement.CellContent, Data);

            return (
                <td key={'cell_' + RowData.RowIndex + '_' + i}>
                  {CellContent}
                </td>
            );
        });
    }


    createTableRow(
        Config, // Описание таблицы и содержимого ячеек
        Row, // Строка записи
        RowIndex=0
    ) {
        let Data = Row;
        
        Data.RowIndex = RowIndex;

        const Columns = this.createColumns(Config, Data);

        return (
            <tr key={'row_' + RowIndex}>
                {Columns}
            </tr>
        );
    }


    prepareTableRows()
    {
        const DataSet = this.getDataSet();

        const TableConfig = this.getColumnList();

        return DataSet.map((Row, i) => {
            return this.createTableRow(TableConfig, Row, i);
        });
    }


    render()
    {
        const HeaderColumns = this.prepareTableHeader();

        const Rows = this.prepareTableRows();

        return (
            <>
                <div className="row">
                    <div className="col-sm-12">

                        <div id="TableNavigator"></div>

                        <div className="table-container">
                            <table className="table table-bordered table-striped no-footer" aria-describedby="DataTables_Table_0_info">
                                <thead>
                                    <tr>
                                    {HeaderColumns}
                                    </tr>
                                </thead>

                                <tbody>
                                    {Rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}