## Available layout parameters
### Circle Layout
| Parameters     | Description                                            | Available parameters                        | Type    | Default    |
|----------------|--------------------------------------------------------|---------------------------------------------|---------|------------|
| margin         | Layout margin.                                         |                                             | Float   | 0.05       |
| direction      | Graph drawing direction.                               | left-right, right-left, top-down, bottom-up | String  | left-right |
| ordering       | For degree which also considers the topological order. | degree, topological                         | String  | 20         |
| starting_angle | Circular layout starting angle.                        |                                             | Float   | 0          |
| angle_ratio    | How many 2*pi from first to last nodes.                |                                             | Integer | 1          |
| radius_ratio   | Factor that radius changes after 2*pi.                 |                                             | Integer | 1          |
| divisions      | How many partitions of the circle are used.            |                                             | Integer | 1          |

### Force Layout
| Parameters      | Description              |  Available parameters                       | Type    | Default    |
|-----------------|--------------------------|---------------------------------------------|---------|------------|
| edgeDistance    |                          |                                             | Integer | 15         |
| edgeStrength    |                          |                                             | Integer | 1          |
| friction        |                          |                                             | Float   | 0.9        |
| charge          |                          |                                             | Integer | -30        |
| theta2          |                          |                                             | Float   | 0.64       |
| size            |                          |                                             | Array   | [1, 1]     |
| margin          | Layout margin.           |                                             | Float   | 0.05       |
| direction       | Graph drawing direction. | left-right, right-left, top-down, bottom-up | String  | left-right |
| chargeDistance2 |                          |                                             | Integer | Infinity   |

### Hierarchical Layout, Hierarchical2 Layout
| Parameters | Description              |  Available parameters                       | Type    | Default    |
|------------|--------------------------|---------------------------------------------|---------|------------|
| margin     | Layout margin.           |                                             | Float   | 0.05       |
| direction  | Graph drawing direction. | left-right, right-left, top-down, bottom-up | String  | left-right |
| roots      |                          | auto, user-defined                          | String  | auto       |

### Random Layout, Grid Layout, Spectral Layout, Tree Layout
| Parameters | Description              |  Available parameters                       | Type   | Default    |
|------------|--------------------------|---------------------------------------------|--------|------------|
| margin     | Layout margin.           | Float                                       | 0.05   |            |
| direction  | Graph drawing direction. | left-right, right-left, top-down, bottom-up | String | left-right |


### Versinus Layout
| Parameters   | Description               |  Available parameters                       | Type   | Default         |
|--------------|---------------------------|---------------------------------------------|--------|-----------------|
| margin       | Layout margin.            |                                             | Float  | 0.05            |
| direction    | Graph drawing direction.  | left-right, right-left, top-down, bottom-up | String | left-right      |
| hubs         | Fraction of hubs.         |                                             | Float  | 0.1             |
| intermediary | Fraction of intermediary. |                                             | Float  | 0.2             |
| method       | Fraction methods.         | fixed_fractions, erdos_sectioning           | String | fixed_fractions |

### Hive Layout
| Parameters     | Description              |  Available parameters                       | Type    | Default     |
|----------------|--------------------------|---------------------------------------------|---------|-------------|
| margin         | Layout margin.           |                                             | Float   | 0.05        |
| direction      | Graph drawing direction. | left-right, right-left, top-down, bottom-up | String  | left-right  |
| nlines         |                          |                                             | Integer | 5           |
| radius         |                          |                                             | Float   | 0.05        |
| starting_angle |                          |                                             | Float   | Math.PI / 2 |
