#!/bin/bash
# Update broken affiliate links with proper search URLs

# Pact Organic - website: https://pact.com
team-db "UPDATE affiliate_links SET affiliate_url = 'https://pact.com/search?q=organic+cotton+crew+neck+tee', vendor_name = 'Pact Organic', is_active = 1 WHERE id = 'al_direct_p_pact-organic_organic-cotton-crew-neck-tee'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://pact.com/search?q=womens+fit+flare+midi+dress', vendor_name = 'Pact Organic', is_active = 1 WHERE id = 'al_direct_p_pact-organic_womens-fit-flare-midi-dress'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://pact.com/search?q=mens+boxer+briefs', vendor_name = 'Pact Organic', is_active = 1 WHERE id = 'al_direct_p_pact-organic_mens-boxer-briefs'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://pact.com/search?q=womens+go+to+legging', vendor_name = 'Pact Organic', is_active = 1 WHERE id = 'al_direct_p_pact-organic_womens-go-to-legging'"

# Acure - website: https://acure.com
team-db "UPDATE affiliate_links SET affiliate_url = 'https://acure.com/search?q=brightening+facial+scrub', vendor_name = 'Acure', is_active = 1 WHERE id = 'al_direct_p_acure_brightening-facial-scrub'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://acure.com/search?q=radically+rejuvenating+whipped+night+cream', vendor_name = 'Acure', is_active = 1 WHERE id = 'al_direct_p_acure_radically-rejuvenating-whipped-night-cream'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://acure.com/search?q=ultra+hydrating+cold+pressed+argan+oil', vendor_name = 'Acure', is_active = 1 WHERE id = 'al_direct_p_acure_ultra-hydrating-100-cold-pressed-argan-oil'"

# Blueland - website: https://blueland.com
team-db "UPDATE affiliate_links SET affiliate_url = 'https://blueland.com/search?q=multi+surface+cleaner+starter+set', vendor_name = 'Blueland', is_active = 1 WHERE id = 'al_direct_p_blueland_multi-surface-cleaner-starter-set'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://blueland.com/search?q=hand+soap+starter+set', vendor_name = 'Blueland', is_active = 1 WHERE id = 'al_direct_p_blueland_hand-soap-starter-set'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://blueland.com/search?q=dish+soap+starter+set', vendor_name = 'Blueland', is_active = 1 WHERE id = 'al_direct_p_blueland_dish-soap-starter-set'"

# Frontier Co-op - website: https://frontiercoop.com
team-db "UPDATE affiliate_links SET affiliate_url = 'https://frontiercoop.com/search?q=organic+nutritional+yeast+flakes', vendor_name = 'Frontier Co-op', is_active = 1 WHERE id = 'al_direct_p_frontier-co-op_organic-nutritional-yeast-flakes'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://frontiercoop.com/search?q=organic+ceylon+cinnamon', vendor_name = 'Frontier Co-op', is_active = 1 WHERE id = 'al_direct_p_frontier-co-op_organic-ceylon-cinnamon'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://frontiercoop.com/search?q=organic+turmeric+root+powder', vendor_name = 'Frontier Co-op', is_active = 1 WHERE id = 'al_direct_p_frontier-co-op_organic-turmeric-root-powder'"

# Patagonia - website: https://patagonia.com
team-db "UPDATE affiliate_links SET affiliate_url = 'https://patagonia.com/search?q=better+sweater+fleece+jacket', vendor_name = 'Patagonia', is_active = 1 WHERE id = 'al_direct_p_patagonia_better-sweater-fleece-jacket'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://patagonia.com/search?q=nano+puff+jacket', vendor_name = 'Patagonia', is_active = 1 WHERE id = 'al_direct_p_patagonia_nano-puff-jacket'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://patagonia.com/search?q=baggies+shorts', vendor_name = 'Patagonia', is_active = 1 WHERE id = 'al_direct_p_patagonia_baggies-shorts-5'"

# Dr. Bronner's - website: https://drbronner.com
team-db "UPDATE affiliate_links SET affiliate_url = 'https://drbronner.com/search?q=peppermint+pure+castile+liquid+soap', vendor_name = 'Dr. Bronner\'s', is_active = 1 WHERE id = 'al_direct_p_dr-bronners_peppermint-pure-castile-liquid-soap'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://drbronner.com/search?q=lavender+pure+castile+liquid+soap', vendor_name = 'Dr. Bronner\'s', is_active = 1 WHERE id = 'al_direct_p_dr-bronners_lavender-pure-castile-liquid-soap'"
team-db "UPDATE affiliate_links SET affiliate_url = 'https://drbronner.com/search?q=peppermint+pure+castile+bar+soap', vendor_name = 'Dr. Bronner\'s', is_active = 1 WHERE id = 'al_direct_p_dr-bronners_peppermint-pure-castile-bar-soap'"

echo "=== ALL UPDATES COMPLETE ==="