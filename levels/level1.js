/**
 * Creates a new Level object with the specified parameters.
 */
const level1 = new Level(
    [
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Endboss()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -718.5 * 4),
        new BackgroundObject('img/5_background/layers/air.png', -718.5 * 3),
        new BackgroundObject('img/5_background/layers/air.png', -718.5 * 2),
        new BackgroundObject('img/5_background/layers/air.png', -718.5),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 718.5),
        new BackgroundObject('img/5_background/layers/air.png', 718.5 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 718.5 * 3),
        new BackgroundObject('img/5_background/layers/air.png', 718.5 * 4),

        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -718.5 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -718.5 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -718.5 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -718.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718.5 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718.5 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718.5 * 4),

        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -718.5 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -718.5 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -718.5 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -718.5),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718.5),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718.5 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718.5 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718.5 * 4),

        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -718.5 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -718.5 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -718.5 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -718.5),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718.5),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718.5 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718.5 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718.5 * 4)
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/2.png', -718.5 * 7),
        new Cloud('img/5_background/layers/4_clouds/1.png', -718.5 * 6),
        new Cloud('img/5_background/layers/4_clouds/2.png', -718.5 * 5),
        new Cloud('img/5_background/layers/4_clouds/1.png', -718.5 * 4),
        new Cloud('img/5_background/layers/4_clouds/2.png', -718.5 * 3),
        new Cloud('img/5_background/layers/4_clouds/1.png', -718.5 * 2),
        new Cloud('img/5_background/layers/4_clouds/2.png', -718.5),
        new Cloud('img/5_background/layers/4_clouds/1.png', 0),
        new Cloud('img/5_background/layers/4_clouds/2.png', 718.5),
        new Cloud('img/5_background/layers/4_clouds/1.png', 718.5 * 2),
        new Cloud('img/5_background/layers/4_clouds/2.png', 718.5 * 3)
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()
    ],
    [
        new HealthItems(),
        new HealthItems(),
        new HealthItems(),
        new HealthItems(),
        new HealthItems()
    ]
);