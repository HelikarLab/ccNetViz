import ccNetViz_color  from './color' ;

function partitionByStyle(data){
    let parts = {};
    
    let pN = {};
    for (let i = 0; i < data.length; i++) {
        let el = data[i];
        let part = parts[el.style] = parts[el.style] || [];
        if(part.idx === undefined)
          part.idx = [];
        part.idx.push(i); 

        el.sI = pN[el.style] = pN[el.style] === undefined ? 0 : pN[el.style]+1;
        
        part.push(el);
    }
    
    return parts;
}

function getPartitionStyle(style, baseStyle, styleProperty){
    let result = {};

    let copy = s => {
        if (s) for (let p in s) result[p] = s[p];
    };

    copy(baseStyle);
    copy(style);

    if (styleProperty) {
        copy(baseStyle[styleProperty]);
        style && copy(style[styleProperty]);
    }
    result.color = result.color && new ccNetViz_color(result.color);
    return result;
};


export {partitionByStyle, getPartitionStyle};