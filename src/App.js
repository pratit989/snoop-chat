import HTMLFlipBook from 'react-pageflip';
import React from 'react';
import useWindowDimensions from './windowDimensions';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../public/pages', false, /\.(png|jpe?g|svg)$/));
const values = Object.keys(images).map(function(k){return images[k]});

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <img src={values[props.number]} style={{height: "inherit", width: "inherit"}}/>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
      <div className="demoPage" ref={ref} data-density="soft">
          <img src={values[props.number]} style={{height: "inherit", width: "inherit"}}/>
      </div>
  );
});

var pagesList = [];
for (var i = 1; i < values.length-1; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    pagesList.push(<Page number={i} key={i}/>);
}
console.log(pagesList);

function App() {
  const { height, width } = useWindowDimensions();
    return (
      <div>
        <HTMLFlipBook width={width < height/1.58 ? height/1.58 : width} height={height}>
            <PageCover number="0">Human Amelioration Vol. 2</PageCover>
            {pagesList}
            <PageCover number="47">The End</PageCover>
        </HTMLFlipBook>
      </div>
  );
}

export default App;
