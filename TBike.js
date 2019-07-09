// function AvaliableBikeCountOrNot(){
// var AvaliableBikeCount=document.getElementsByClassName('AvaliableBikeCount')
// console.log(AvaliableBikeCount[0])
// for(let j=0;j< AvaliableBikeCount.length;j++){
//   if (AvaliableBikeCount[j]==0){
//     AvaliableBikeCount[j].css('color','red');
//   }
// }
// }
var cssheight = $(window).height();
$('#map').css('height', 'height');
$(function () {
  var w = $(window).width();
  var h = $(window).height();
  console.log(w, h)
  if (w < 545) {
    $('#selectMain').css('width', '300px');

  }
});

var map;
var Latitude = 22.991429;
var Longitude = 120.188112;
function initMap() {
  if (Latitude != '' && Longitude != '') {
    var position = {
      lat: Latitude,
      lng: Longitude
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: position,
      styles:
        [
          {
            "featureType": "landscape",
            "stylers": [
              {
                "hue": "#FFBB00"
              },
              {
                "saturation": 43.400000000000006
              },
              {
                "lightness": 37.599999999999994
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.highway",
            "stylers": [
              {
                "hue": "#FFC200"
              },
              {
                "saturation": -61.8
              },
              {
                "lightness": 45.599999999999994
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "stylers": [
              {
                "hue": "#FF0300"
              },
              {
                "saturation": -100
              },
              {
                "lightness": 51.19999999999999
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.local",
            "stylers": [
              {
                "hue": "#FF0300"
              },
              {
                "saturation": -100
              },
              {
                "lightness": 52
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "water",
            "stylers": [
              {
                "hue": "#0078FF"
              },
              {
                "saturation": -13.200000000000003
              },
              {
                "lightness": 2.4000000000000057
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "hue": "#2F4F4F"
              },
              {
                "saturation": -1.0989010989011234
              },
              {
                "lightness": 11.200000000000017
              },
              {
                "gamma": 1
              }
            ]
          }
        ]
    });
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.BOUNCE
    });
  }
}


let vm = new Vue({
  el: "#app",
  data: {
    contents: [],
    area: '',
    Latitude: '',
    MapLink: '',
    LocationName: '',
  },
  computed: {
    SelectArea() {
      let SelectArray = {};
      let j = 0;
      this.contents.forEach((item) => {
        if (!SelectArray[item.District]) SelectArray[item.District] = 1
        else SelectArray[item.District]++
      })
      console.log(SelectArray)
      return SelectArray
    },
    AfterSelectShow() {
      if (this.area === 'all') {
        return this.contents
      } else {
        return this.contents.filter((item) => {
          return item.District == this.area
        })
      }
    }

  },
  methods: {
    ShowMap(Name) {
      for (let j = 0; j < this.contents.length; j++) {
        if (this.contents[j].StationName === Name) {
          Latitude = this.contents[j].Latitude;

          Longitude = this.contents[j].Longitude;

          let StationName = this.contents[j].StationName;
          console.log(Latitude, Longitude)
          vm.MapLink = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyAKPRtjCaWwtsRtJLlQWDC4c9UapdhJu1o&q=' + StationName + '&zoom=16&center=' + Latitude + ',' + Longitude
          console.log(vm.MapLink)
          initMap()
          break;
        }
      }
      console.log(Name)
    }

  },
  mounted() {
    let url = 'https://cors-anywhere.herokuapp.com/http://tbike.tainan.gov.tw:8081/Service/StationStatus/Json';
    //https://cors-anywhere.herokuapp.com/
    axios.get(url).then((res) => {
      this.contents = res.data
      console.log(this.contents);

    })
  }
})
