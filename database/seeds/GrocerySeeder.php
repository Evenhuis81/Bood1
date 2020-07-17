<?php

use App\Grocery;
use Illuminate\Database\Seeder;

class GrocerySeeder extends Seeder
{
    protected $fillable = ['name', 'description', 'price', 'amount', 'image'];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
{
        $names = ['Bananen', 'Brood', 'Vleeswaren', 'Melk', 'Frisdrank'];
        $descriptions = ['Bananen met een zachte en zoete smaak. Lekker om zo te eten als gezond tussendoortje.', 'Brood voor een lekker, stevige boterham. Voor ontbijt, lunch of ieder ander moment van de dag.', 'Ideaal om iedere boterham mee te beleggen. En lekker veelzijdig: op een pistoletje met honing-mosterd dressing, bij de asperges, witlof of gewoon uit het vuistje.', 'Verse halfvolle melk, gepasteuriseerd.', 'De meest favoriete frisdrank van de wereld. De 1L PET is de ideale fles om samen te delen tijdens de maaltijd'];
        $prices = [1.19, 2.39, 1.49, 2.09, 1.89];
        $images = ['https://static.ah.nl/static/product/AHI_43545239363232373439_1_LowRes_JPG.JPG?options=399,q85', 'https://static.ah.nl/static/product/AHI_43545239363037333231_1_LowRes_JPG.JPG?options=399,q85', 'https://static.ah.nl/static/product/AHI_43545239363333333936_1_LowRes_JPG.JPG?options=399,q85', 'https://static.ah.nl/static/product/AHI_43545239353433343631_1_LowRes_JPG.JPG?options=399,q85', 'https://static.ah.nl/static/product/AHI_43545239353339363637_2_LowRes_JPG.JPG?options=399,q85'];
        foreach (array_keys($names) as $key) {
            Grocery::create([
                'name' => $names[$key],
                'description' => $descriptions[$key],
                'price' => $prices[$key],
                'amount' => 0,
                'image' => $images[$key]
            ]);
        }
    }
}
