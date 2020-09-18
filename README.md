# [ccNetViz](http://helikarlab.github.io/ccNetViz/)

[![Build Status](https://travis-ci.org/HelikarLab/ccNetViz.svg?branch=master)](https://travis-ci.org/HelikarLab/ccNetViz)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/HelikarLab/ccNetViz/issues)
[![HitCount](http://hits.dwyl.com/{username}/{project-name}.svg)](http://hits.dwyl.com/HelikarLab/ccNetViz)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


====================================

Graph theory (a.k.a. network) library for analysis and visualisation

NOTE: This page is intended as a documentation for the people maintaining the library. If you want to use the library as a user please visit our [webpage](http://helikarlab.github.io/ccNetViz/) to see the more docs and examples.

## Description

[ccNetViz](http://helikarlab.github.io/ccNetViz) is a lightweight, high performance javascript library for large network graphs (see [graph theory](https://en.wikipedia.org/wiki/Graph_theory)) visualization using WebGL.
It enables custom styling of nodes and edges in css like way, curve edges, dynamic changes of the network, a number of layout settings (see [the layout directory](https://github.com/HelikarLab/ccNetViz/tree/master/src/layout)) and basic graph interactivity.
Used for example by [Cell Collective](http://cellcollective.org) project.
[ccNetViz](http://helikarlab.github.io/ccNetViz) is open source library available under [GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html) License.

## Plugin's Documentation

- [line animation plugin](./src/plugins/animation-line/README.md)

## Development in ccNetViz

Please follow the below instructions to get started with development in ccNetViz:

> You need to have [Node](https://nodejs.org/) and [yarn](https://yarnpkg.com/) .

1. Clone the repository.
2. Run `yarn install` inside the cloned repository to install dependencies.
3. Run `yarn dev` and go to `http://localhost:8080`. From here go to any of the examples or tests.
4. Making any changes to the src/ directory will trigger an auto reload and build of the webpage.
5. Finally when you are done with the changes run `yarn build` to create the final build.

_Note: if your having any problem with seeing changes, clear the browser cache._

## Contributing

If you are looking to contribute to ccNetViz, fork the ccNetViz repo, follow all the above steps (i.e. Development in ccNetViz), commit the changes(ccNetViz follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#specification) specification, please adhere to this format of commits in your Pull Requests) to your fork and make a pull request to ccNetViz.


#  how to send a pull request:
 
 Create a new branch with a meaningful name `git checkout -b branch_name`.<br />
* Develop your feature on Xcode IDE  and run it .<br />
* Add the files you changed `git add file_name`.<br />
* Commit your changes `git commit -m "Message briefly explaining the feature"`.<br />
* Keep one commit per feature. If you forgot to add changes, you can edit the previous commit `git commit --amend`.<br />
* Push to your repo `git push origin branch-name`.<br />
* Go into [the Github repo](https://github.com/HelikarLab/ccNetViz/edit/) and create a pull request explaining your changes.<br />
* If you are requested to make changes, edit your commit using `git commit --amend`, push again and the pull request will edit automatically.<br />
* If the PR is related to any front end change, please attach relevant screenshots in the pull request description.


[heilikarlab]: https://github.com/HelikarLab/ccNetViz

#### Developing new layouts

We recommend adding new/other layouts to src/layouts/ directory
and allowing its usage by routing in src/layouts/layouts.js
like implemented to the builtin layouts.

See the wiki pages for more information on the layouts implemented and that are possible.
