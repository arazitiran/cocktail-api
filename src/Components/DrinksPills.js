import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


function DrinksPills() {
    let allDrinks = useSelector(state => state.allDrinks);
    let dispatch = useDispatch();

    return (
<ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Much longer nav link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul>
            );
          }
export default DrinksPills