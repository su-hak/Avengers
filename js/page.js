//
// $(document).ready(function() {
//     modifyViewableElements();
//     //Enable clicking champs in dropdowns
//     addChampReplacement();
//     //Initialize default champ portrait
//     initializePortraits();
//     //Make items in dropdown clickable
//     makeItemsClickable();
//     //Make rune dropdowns clickable
//     makeRunesClickable();
//     //Allow item tooltip requests
//     enableItemTooltips();
//     //Allow rune tootip requests
//     enableRuneTooltips();
//     //Enable champ search for each dropdown
//     enableSearch("#left-champ-search");
//     enableSearch("#right-champ-search");
//     //Enable item search
//     enableSearch("#left-item-search");
//     enableSearch("#right-item-search");
//     //Enable level changes via dropdown
//     enableLevelChange("#left-level");
//     enableLevelChange("#right-level")
//     //Enable auto attack functionality
//     enableAutoAttacks();
//     //Enable ability functionality
//     enableAbilities();
//     //Enable Ability Ranks
//     enableAbilityRanks();
//     //Enable selectable rune trees
//     enableRunePageSwitching();
//     //Enable action queue reset
//     $("#reset-queue").on("click", resetActionQueue);
//     //Enable tooltips
//     $('[data-toggle="tooltip"]').tooltip();
//     $('[data-toggle="popover"]').popover({
//         delay: {
//             show: 200
//         }
//     });
//     //Disable enter key for input
//     $("input").on("keypress", function(e) {
//         if (e.which == '13') {
//             e.preventDefault();
//         }
//     });
//     enableItemFilters("left");
//     enableItemFilters("right");
//     sendData();
//     enableCustomizableStats();
//     $("#left-customizations").on("click", function(e) {
//         e.stopPropagation();
//     });
//     $("#right-customizations").on("click", function(e) {
//         e.stopPropagation();
//     });
//     $("#left-customization-button").on("click", function(e) {
//         getChampionStats(e);
//     });
//     $("#right-customization-button").on("click", function(e) {
//         getChampionStats(e);
//     });
//     // Limit text/number input to 5 digits
//     $('input[type=number]').keypress(function(e) {
//         if (this.value.length == 5) {
//             return false;
//         }
//     });
//     // Show/hide champion customizations
//     enableHideChampCustomizations();
//     resetChildCustomizations();
//     $(window).resize(modifyViewableElements);
// });
//
//
//
// //This must be called before initializePortraits()
// function addChampReplacement() {
//     //Add left champ replacements
//     $champs = $("#left-champ").find(".col-3.bg-hover");
//     $champs.on("click", {elem: "#left-champ-portrait"}, changeChampion);
//     //Add right champ replacements
//     $champs = $("#right-champ").find(".col-3.bg-hover");
//     $champs.on("click", {elem: "#right-champ-portrait"}, changeChampion);
// }
//
// function changeChampion(event) {
//     var source = $(event.target);
//     while (!source.is(".col-3.bg-hover")){
//         source = source.parent();
//     }
//     if ($(event.data.elem).attr("name") == source.find(".champ-name").text()) {
//         return;
//     }
//     resetActionQueue(event);
//     var img = source.find(".portrait").attr("class").split(' ');
//     $.each(img, function(index, item) {
//         if (item.includes("sprite-")) {
//             img = item;
//             return false;
//         }
//     });
//     var name = source.find(".champ-name").text();
//     var classes = $(event.data.elem).attr("class").split(" ");
//     $.each(classes, function(index, item) {
//         if (item.includes("sprite-")) {
//             $(event.data.elem).removeClass(item);
//             return false;
//         }
//     });
//     $(event.data.elem).addClass(img).attr("name", name).attr("data-original-title", name);
//     var id = $(event.data.elem).attr("id");
//     var side = "left";
//     if (id.includes("right")) {
//         side = "right";
//     }
//     // Reset all champion customizations on champion change
//     var customizations = $("#" + side + "-champion-customizations").find(":input[type=number]");
//     for (i = 0; i < customizations.length; ++i) {
//         $(customizations[i]).val($(customizations[i]).attr("original"));
//     }
//     sendData();
// }
//
// //Make the default champions the first champion in the list
// function initializePortraits() {
//     var left = $("#left-champ-portrait");
//     var right = $("#right-champ-portrait");
//     var firstChild = $(".dropdown-menu.dropdown-multicol").find(".col-3.bg-hover")[0];
//     var img = $(firstChild).find("img").attr("class").split(" ");
//     $.each(img, function(index, item) {
//         if (item.includes("sprite-")) {
//             img = item;
//             return false;
//         }
//     });
//     var name = $(firstChild).find("p").text();
//     left.addClass(img).attr("name", name).attr("data-original-title", name).width("45%").css("padding-top", "45%");
//     right.addClass(img).attr("name", name).attr("data-original-title", name).width("45%").css("padding-top", "45%");
// }
//
// function makeItemsClickable() {
//     $items = $("#left-item-list").find(".col-3.bg-hover");
//     $items.on("click", {elem: "#left-items"}, addItem);
//     $items = $("#right-item-list").find(".col-3.bg-hover");
//     $items.on("click", {elem: "#right-items"}, addItem);
// }
//
// function enableItemTooltips() {
//     $items = $("#left-item-list").find(".col-3.bg-hover").find("img");
//     $items.on("mouseenter", getTooltip);
//     $items = $("#right-item-list").find(".col-3.bg-hover").find("img");
//     $items.on("mouseenter", getTooltip);
// }
//
// //Enable users to add items from the list
// function addItem(event) {
//     //Get the clicked item's image
//     var source = $(event.target);
//     while (!source.is(".col-3.bg-hover")){
//         source = source.parent();
//     }
//     var img = source.find(".portrait").attr("class").split(" ");
//     $.each(img, function(index, item) {
//         if (item.includes("sprite-")) {
//             img = item;
//             return false;
//         }
//     });
//     var name = source.find(".champ-name").text();
//
//     //Find the corresponding image slots
//     itemSlots = $(event.data.elem).find("img");
//     //Search for and add to an empty item slot if available
//     var added = false;
//     for (i = 0; i < itemSlots.length; ++i) {
//         var target = $(itemSlots[i])
//         if (target.attr("name") == "None") {
//             added = true;
//             target.addClass(img).addClass("item-placeholder");
//             target.attr("name", name);
//             target.attr("data-content", source.find(".portrait").attr("data-content"));
//             target.on("click", removableItem);
//             target.on("mouseenter mouseleave", hoverObject);
//             break;
//         }
//     }
//     if (added) {
//         sendData();
//     }
//     event.stopPropagation();
// }
//
// //Use a GET request to retrieve item tooltips
// function getTooltip(event) {
//     var source = $(event.target);
//     if (source.attr("data-content") == "") {
//         var name = source.parent().find("p").text();
//         //Get both item images
//         var both = $("p:contains(" + name + ")").parent().prev();
//         $.ajax ({
//             url: "/item/" + name,
//             type: "GET",
//             success: function(response) {
//                 tooltip = response;
//                 both.attr("data-content", tooltip);
//             }
//         });
//     }
//     else {
//         return
//     }
// }
//
// //Use a GET request to retrieve champion base/growth stats
// function getChampionStats(event) {
//     var source = $(event.target);
//     var side = "left"
//     if (source.attr("id").includes("right")) {
//         side = "right";
//     }
//     var name = $("#" + side + "-champ-portrait").attr("name");
//     if ($("#" + side + "-customizations").attr("champion") == name) {
//         return;
//     }
//     $.ajax ({
//         url: "/champion/" + name,
//         type: "GET",
//         success: function(response) {
//             parseChampionStatsResponse(side, name, response);
//         }
//     });
// }
//
// //Add front-end exception for cassiopeia and boots
// function checkCassiopeiaBoots(event, name) {
//     lower = name.toLowerCase()
//     if (event.data.elem.includes("left")) {
//         if ($("#left-champ-portrait").attr("name") == "Cassiopeia") {
//             if (lower.includes("boots") || lower.includes("greaves") || lower.includes("shoes") || lower.includes("treads") || lower.includes("ninja tabi")) {
//                 return true;
//             }
//         }
//     }
//     else {
//         if ($("#right-champ-portrait").attr("name") == "Cassiopeia") {
//             if (lower.includes("boots") || lower.includes("greaves") || lower.includes("shoes") || lower.includes("treads") || lower.includes("ninja tabi")) {
//                 return true;
//             }
//         }
//     }
// }
//
// //Add item and champion searching
// function enableSearch(parent) {
//     var searchBar = $(parent)
//     searchBar.on("keyup", function() {
//         var input = $(this).val();
//         searchItems(input, parent);
//     });
// }
//
// // Perform an text-based search for matching item names
// function searchItems(input, parent) {
//     var filter = input.toUpperCase();
//     // Select all .col-3.bg-hover where the parent is a row preceded by #id
//     var candidates = $(parent).find(".col-3.bg-hover");
//     while ($(candidates).length == 0) {
//         parent = $(parent).parent();
//         candidates = parent.find(".col-3.bg-hover");
//     }
//     for (var i = 0; i < candidates.length; ++i) {
//         if ($(candidates[i]).attr("filtered") == "true") {
//             continue;
//         }
//         var img = $(candidates[i]).find("img");
//         var name = $(candidates[i]).find("p");
//         var text = name.text();
//         if (text.toUpperCase().indexOf(filter) > -1) {
//             $(candidates[i]).show();
//         }
//         else {
//             $(candidates[i]).hide();
//         }
//     }
// }
//
//
// //Enable clickable/settable levels
// function enableLevelChange(id) {
//     var button = $(id)
//     var options = button.find("p")
//     //Add functionality to each <p> tagged level
//     for (i = 0; i < options.length; ++i) {
//         $(options[i]).on("click", {parent: id}, changeLevel);
//     }
// }
//
// //Change level when a level is selected
// function changeLevel(event) {
//     var source = $(event.target);
//     var level = source.text();
//     //Get the level dropdown button and change the text
//     var button = $(event.data.parent).children()[0];
//     $(button).text("Level - " + level)
//     //Change the value of the dropdown
//     var originalLevel =  $(event.data.parent).attr("data-value")
//     $(event.data.parent).attr("data-value", level);
//     if (originalLevel != level) {
//         sendData();
//     }
// }
//
// //Sends all current data to the server
// function sendData() {
//     $.ajax({
//         type : "POST",
//         url : "/",
//         contentType: "application/json; charset=utf-8",
//         data : JSON.stringify({
//             "left_champ" : $("#left-champ-portrait").attr("name"),
//             "left_level" : $("#left-level").attr("data-value"),
//             "left_q_level" : $("#left-q-level").text(),
//             "left_w_level" : $("#left-w-level").text(),
//             "left_e_level" : $("#left-e-level").text(),
//             "left_r_level" : $("#left-r-level").text(),
//             "right_champ" : $("#right-champ-portrait").attr("name"),
//             "right_level" : $("#right-level").attr("data-value"),
//             "right_q_level" : $("#right-q-level").text(),
//             "right_w_level" : $("#right-w-level").text(),
//             "right_e_level" : $("#right-e-level").text(),
//             "right_r_level" : $("#right-r-level").text(),
//             "left_items" : [
//                 $("#left-item-1 > img").attr("name"),
//                 $("#left-item-2 > img").attr("name"),
//                 $("#left-item-3 > img").attr("name"),
//                 $("#left-item-4 > img").attr("name"),
//                 $("#left-item-5 > img").attr("name"),
//                 $("#left-item-6 > img").attr("name")
//             ],
//             "right_items" : [
//                 $("#right-item-1 > img").attr("name"),
//                 $("#right-item-2 > img").attr("name"),
//                 $("#right-item-3 > img").attr("name"),
//                 $("#right-item-4 > img").attr("name"),
//                 $("#right-item-5 > img").attr("name"),
//                 $("#right-item-6 > img").attr("name"),
//             ],
//             "left_customizations": getCustomizations("left"),
//             "right_customizations": getCustomizations("right"),
//             "left_runes" : getRunes("left"),
//             "right_runes" : getRunes("right"),
//             "action_queue" : sortActionQueue()
//         }),
//         success : function(result) {
//             parseResponse(result)
//         }
//     });
// }
//
// function parseResponse(response) {
//
//     // Update the health bars
//     setHealthBar(response, "left");
//     setHealthBar(response, "right");
//     // Update the mana bars
//     setManaBar(response, "left");
//     setManaBar(response, "right");
//     // Update statistics
//     updateStats(response, "left");
//     updateStats(response, "right");
//     // Update gold costs
//     updateGoldCosts(response, "left");
//     updateGoldCosts(response, "right")
//     // Update items (set items equal to what the server sees
//     updateItems(response, "left");
//     updateItems(response, "right");
//     // Update spell images
//     updateSpells(response, "left");
//     updateSpells(response, "right");
//     // Update time in combat
//     updateCombatTime(response);
//     // Update visual cooldown indicator for spells
//     updateCooldownIndicators(response);
//     // Update starting hp/rsc on level/champion change
//     updateStartingStats(response);
//     // Find and update existing popovers
//     updatePopovers();
// }
//
// function parseChampionStatsResponse(side, name, response) {
//     // Add the champion name as an attribute so the GET request is only called once per champion (checked elsewhere)
//     $("#" + side + "-customizations").attr("champion", name);
//     // Fill and set default values for each customizable stat
//     $("#" + side + "-base-hp").val(response["BaseHP"]).attr("original", response["BaseHP"]);
//     $("#" + side + "-base-hp-per-level").val(response["HPPerLevel"]).attr("original", response["HPPerLevel"]);
//     $("#" + side + "-base-hp-regen").val(response["BaseHPRegen"]).attr("original", response["BaseHPRegen"]);
//     $("#" + side + "-base-hp-regen-per-level").val(response["HPRegenPerLevel"]).attr("original", response["HPRegenPerLevel"]);
//     $("#" + side + "-base-ad").val(response["BaseAD"]).attr("original", response["BaseAD"]);
//     $("#" + side + "-base-ad-per-level").val(response["ADPerLevel"]).attr("original", response["ADPerLevel"]);
//     $("#" + side + "-base-as").val(response["BaseAS"]).attr("original", response["BaseAS"]);
//     $("#" + side + "-base-as-per-level").val(response["ASPerLevel"]).attr("original", response["ASPerLevel"]);
//     $("#" + side + "-base-armor").val(response["BaseAR"]).attr("original", response["BaseAR"]);
//     $("#" + side + "-base-armor-per-level").val(response["ARPerLevel"]).attr("original", response["ARPerLevel"]);
//     $("#" + side + "-base-mr").val(response["BaseMR"]).attr("original", response["BaseMR"]);
//     $("#" + side + "-base-mr-per-level").val(response["MRPerLevel"]).attr("original", response["MRPerLevel"]);
//     $("#" + side + "-base-ms").val(response["BaseMS"]).attr("original", response["BaseMS"]);
//     var baseRsc = Number(response["BaseRsc"]);
//     if (baseRsc > 0) {
//         $("#" + side + "-base-rsc").val(baseRsc).prop("disabled", false).attr("original", baseRsc);
//     }
//     else {
//         $("#" + side + "-base-rsc").val("").prop("disabled", true).attr("original", "");
//     }
//     var rscPerLevel = Number(response["RscPerLevel"]);
//     if (rscPerLevel > 0) {
//         $("#" + side + "-base-rsc-per-level").val(rscPerLevel).prop("disabled", false).attr("original", rscPerLevel);
//     }
//     else {
//         $("#" + side + "-base-rsc-per-level").val("").prop("disabled", true).attr("original", "");
//     }
//     var baseRscRegen = Number(response["BaseRscRegen"]);
//     if (baseRscRegen > 0) {
//         $("#" + side + "-base-rsc-regen").val(baseRscRegen).prop("disabled", false).attr("original", baseRscRegen);
//     }
//     else {
//         $("#" + side + "-base-rsc-regen").val("").prop("disabled", true).attr("original", "");
//     }
//     var rscRegenPerLevel = Number(response["RscRegenPerLevel"]);
//     if (rscRegenPerLevel > 0) {
//         $("#" + side + "-base-rsc-regen-per-level").val(rscRegenPerLevel).prop("disabled", false).attr("original", rscRegenPerLevel);
//     }
//     else {
//         $("#" + side + "-base-rsc-regen-per-level").val("").prop("disabled", true).attr("original", "");
//     }
//     // Disable customizable Rsc, Rsc regen for energy based champions
//     if (baseRsc == 200 && rscPerLevel == 0) {
//         $("#" + side + "-base-rsc").prop("disabled", true);
//         $("#" + side + "-base-rsc-regen").prop("disabled", true);
//     }
// }
//
// function setHealthBar(response, side) {
//     var maxHP = response[side + "MaxHP"];
//     var currentHP = response[side + "CurrentHP"];
//     var magicShield = response[side + "MagicShield"];
//     var mShieldEnabled = false;
//     var target = $("#" + side + "-hp-bar");
//     var eHP = maxHP + magicShield
//     var percentage = Math.round(100 * currentHP / maxHP);
//     $("#" + side + "-health-text").text(percentage + "% (" + currentHP + "/" + maxHP + ")");
//     $("#" + side + "-health-text").attr("data-original-title", "HP Regen Per Second: " + response[side + "HPRegen"]);
//     $("#" + side + "-health-text").css("height", target.height()).addClass("mx-auto").css("top", target.position().top);
//     target.width(percentage + "%");
//     if (magicShield > 0) {
//         $("#" + side + "-magic-shield").show();
//         var magicShieldPercentage = Math.round(100 * magicShield / currentHP);
//         $("#" + side + "-magic-shield").width(magicShieldPercentage + "%");
//         $("#" + side + "-magic-shield").css("margin-left", target.width() + "px");
//     }
//     else {
//         $("#" + side + "-magic-shield").hide();
//     }
// }
//
// function setManaBar(response, side) {
//     var maxMana = response[side + "MaxMana"];
//     var currentMana = response[side + "CurrentMana"];
//     var target = $("#" + side + "-rsc-bar");
//     target.width("100%");
//     $("#" + side + "-rsc-text").addClass("text-white");
//     target.removeClass("energy-based");
//     if (maxMana == 0) {
//         var maxEnergy = response[side + 'MaxEnergy'];
//         //Resourceless Champions
//         if (maxEnergy == 0) {
//             target.next().text("Manaless").removeClass("energy-text");
//             target.next().attr("data-original-title", "Champion does not use mana");
//             target.width("100%").addClass("resourceless");
//             return
//         }
//         //Energy based champions
//         else {
//             var currentEnergy = response[side + 'CurrentEnergy'];
//             var percentage = Math.round(100 * currentEnergy / maxEnergy);
//             target.next().text(percentage + "% (" + currentEnergy + "/" + maxEnergy + ")").addClass("energy-text");
//             target.next().attr("data-original-title", "Energy Regen: " + response[side + "EnergyRegen"]);
//             target.width(percentage + "%");
//             $("#" + side + "-rsc-text").removeClass("text-white");
//             if (target.hasClass("resourceless")) {
//                 target.removeClass("resourceless");
//             }
//             target.addClass("energy-based");
//             return;
//         }
//     }
//     if (target.hasClass("resourceless")) {
//         target.removeClass("resourceless");
//     }
//     if (target.hasClass("energy-based")) {
//         target.removeClass("energy-based");
//     }
//     var percentage = Math.round(100 * currentMana / maxMana);
//     target.next().text(percentage + "% (" + currentMana + "/" + maxMana + ")").removeClass("energy-text");
//     target.next().attr("data-original-title", "MP Regen Per Second: " + response[side + "ManaRegen"]);
//     target.width(percentage + "%");
// }
//
// function updateStats(data, side) {
//     $("#" + side + "-ad-val").text(data[side + "AD"]);
//     $("#" + side + "-ap-val").text(data[side + "AP"]);
//     $("#" + side + "-armor-val").text(data[side + "Armor"]);
//     $("#" + side + "-mr-val").text(data[side + "MR"]);
//     $("#" + side + "-attspd-val").text(data[side + "AS"]);
//     $("#" + side + "-movespd-val").text(data[side + "MS"]);
//     $("#" + side + "-lethality-val").text(data[side + "Leth"]);
//     $("#" + side + "-cdr-val").text(data[side + "CDR"]);
//     $("#" + side + "-crit-val").text(data[side + "Crit"] + "%");
//     $("#" + side + "-cmulti-val").text(data[side + "CMulti"] + "X");
//     $("#" + side + "-lifesteal-val").text(data[side + "LifeSteal"] + "%");
//     $("#" + side + "-hspower-val").text(data[side + "HSPower"] + "%");
//     $("#" + side + "-apen-val").text(data[side + 'ArmorPen'] + "%");
//     $("#" + side + "-mpen-val").text(data[side + "FlatMPen"] + " | " + data[side + "PercMPen"] + "%");
// }
//
// // Update gold costs
// function updateGoldCosts(response, side) {
//     var target = $("#" + side + "GoldCost");
//     var cost = response[side + "GoldCost"];
//     target.text("Gold Cost: " + cost);
// }
//
// // Update champion items (removes duplicate items, limited items, etc. as judged by the server)
// function updateItems(response, side) {
//     var items = response[side + "Items"];
//     // Iterate over all items for each side
//     var children = $("[id^=" + side + "-item-].col-4").children("img");
//     var items_index = 0;
//     for (i = 0; i < children.length; ++i) {
//         var existing_name = $(children[i]).attr("name");
//         if (existing_name !== items[items_index]) {
//             removeItem($(children[i]));
//         } else {
//             items_index++;
//         }
//         $(children[i]).removeClass("item-placeholder");
//     }
// }
//
// // Update all spell data for each champion
// function updateSpells(response, side) {
//     var spells = response[side + "Images"];
//     var passive = spells['passive']
//     var q = spells["QAbility"]
//     var w = spells["WAbility"]
//     var e = spells["EAbility"]
//     var r = spells["RAbility"]
//     // Update spell images
//     $("#" + side + "-passive").removeClass (function (index, css) {
//         return (css.match (/(^|\s)sprite-\S+/g) || []).join(' ');
//     });
//     $("#" + side + "-passive").addClass("sprite-" + passive['image']);
//     $("#" + side + "-q").removeClass (function (index, css) {
//         return (css.match (/(^|\s)sprite-\S+/g) || []).join(' ');
//     });
//     $("#" + side + "-q").addClass("sprite-" + q['image']);
//     $("#" + side + "-w").removeClass (function (index, css) {
//         return (css.match (/(^|\s)sprite-\S+/g) || []).join(' ');
//     });
//     $("#" + side + "-w").addClass("sprite-" + w['image']);
//     $("#" + side + "-e").removeClass (function (index, css) {
//         return (css.match (/(^|\s)sprite-\S+/g) || []).join(' ');
//     });
//     $("#" + side + "-e").addClass("sprite-" + e['image']);
//     $("#" + side + "-r").removeClass (function (index, css) {
//         return (css.match (/(^|\s)sprite-\S+/g) || []).join(' ');
//     });
//     $("#" + side + "-r").addClass("sprite-" + r['image']);
//     // Update spell descriptions
//     $("#" + side + "-passive").attr("data-content", passive['description']);
//     $("#" + side + "-q").attr("data-content", q['description']);
//     $("#" + side + "-w").attr("data-content", w['description']);
//     $("#" + side + "-e").attr("data-content", e['description']);
//     $("#" + side + "-r").attr("data-content", r['description']);
// }
//
// function updateCombatTime(response) {
//     var time = response['totalTime']
//     $("#combat-time").text("Elapsed Time (s): " + time);
// }
//
// function updateCooldownIndicators(response) {
//     var sides = ["left", "right"];
//     for (var i = 0; i < sides.length; ++i) {
//         var side = sides[i];
//         var spells = response[side + "Images"];
//         var passive = spells['passive'];
//         var q = spells["QAbility"];
//         var w = spells["WAbility"];
//         var e = spells["EAbility"];
//         var r = spells["RAbility"];
//         var descriptions = [passive, q, w, e, r];
//         var targets = ["passive", "q", "w", "e", "r"];
//         for (var j = 0; j < descriptions.length; ++j) {
//             var des = descriptions[j]["description"];
//             var target = targets[j]
//             if (des.includes("Cooldown:") && des.includes("Remaining Cooldown:")) {
//                 var max_cooldown = Number(des.match(/^Cooldown: (\d*\.?\d*)/)[1]);
//                 var remaining_cooldown = Number(des.match(/Remaining Cooldown: (\d*\.?\d*)/)[1]);
//                 $("#" + side + "-" + target + "-cooldown").css("width", getPercentRemaining(max_cooldown, remaining_cooldown) + "%");
//             }
//             else {
//                 $("#" + side + "-" + target + "-cooldown").css("width", "0%");
//             }
//         }
//     }
// }
//
// function updateStartingStats(response) {
//     var sides = ["left", "right"];
//     for (var i = 0; i < sides.length; ++i) {
//         var side = sides[i];
//         var maxHp = Number(response[side + "MaxHP"]);
//         var maxEnergy = Number(response[side + "MaxEnergy"]);
//         var maxMana = Number(response[side + "MaxMana"]);
//         var originalHp = Number($("#" + side + "-starting-hp").attr("original"));
//         var originalRsc = Number($("#" + side + "-starting-rsc").attr("original"));
//         $("#" + side + "-starting-hp").attr("original", maxHp);
//         if (maxEnergy > 0) {
//             $("#" + side + "-starting-rsc").attr("original", maxEnergy).prop("disabled", false);
//         }
//         else if (maxMana > 0) {
//             $("#" + side + "-starting-rsc").attr("original", maxMana).prop("disabled", false);
//         }
//         else {
//             $("#" + side + "-starting-rsc").attr("original", "").val("").prop("disabled", true);
//         }
//         if (Number($("#" + side + "-starting-rsc").val()) > Number($("#" + side + "-starting-rsc").attr("original"))) {
//             $("#" + side + "-starting-rsc").val($("#" + side + "-starting-rsc").attr("original"));
//         }
//         else if (originalRsc == Number($("#" + side + "-starting-rsc").val())) {
//             $("#" + side + "-starting-rsc").val($("#" + side + "-starting-rsc").attr("original"));
//         }
//         if (Number($("#" + side + "-starting-hp").val()) > Number($("#" + side + "-starting-hp").attr("original"))) {
//             $("#" + side + "-starting-hp").val($("#" + side + "-starting-hp").attr("original"));
//         }
//         else if (originalHp == Number($("#" + side + "-starting-hp").val())) {
//             $("#" + side + "-starting-hp").val(maxHp);
//         }
//         if (!$("#" + side + "-starting-hp").val()) {
//             $("#" + side + "-starting-hp").val($("#" + side + "-starting-hp").attr("original"));
//         }
//         if (!$("#" + side + "-starting-rsc").val()) {
//             $("#" + side + "-starting-rsc").val($("#" + side + "-starting-rsc").attr("original"));
//         }
//     }
// }
//
// function getPercentRemaining(max, rem) {
//     return 100 * rem / max;
// }
//
// // Update popovers if content changed
// function updatePopovers() {
//     var source = $("[aria-describedby]");
//     if (source.length > 0) {
//         var id = "#" + source.attr("aria-describedby");
//         $(id).find(".popover-body").html(source.attr("data-content"));
//     }
// }
//
// // Remove an item without clicking
// function removeItem(source) {
//     var classes = source.attr("class").split(" ")
//     $.each(classes, function(index, item) {
//         if (item.includes("sprite-")) {
//             source.removeClass(item)
//             return false;
//         }
//     });
//     source.attr("name", "None");
//     source.removeAttr("data-original-title");
//     source.mouseleave();
//     source.off("click");
//     source.attr("data-content", "");
//     if (source.hasClass("hovered")) {
//         source.removeClass("hovered");
//     }
// }
//
// // Allows for all items to be properly removed
// function removableItem(event) {
//     var source = $(event.target);
//     var classes = source.attr("class").split(" ")
//     $.each(classes, function(index, item) {
//         if (item.includes("sprite-")) {
//             source.removeClass(item)
//             return false;
//         }
//     });
//     source.attr("name", "None");
//     source.removeAttr("data-original-title");
//     source.mouseleave();
//     source.off("click");
//     source.attr("data-content", "");
//     if (source.hasClass("hovered")) {
//         source.removeClass("hovered");
//     }
//     sendData();
// }
//
// // Allows for items being hovered to increase/decrease in size
// function hoverObject(event) {
//     var source = $(event.target);
//     if (event.type === "mouseenter" && source.attr("name") != "None") {
//         source.addClass("hovered");
//     }
//     else {
//         source.removeClass("hovered");
//     }
// }
//
// //Enables auto attack buttons
// function enableAutoAttacks() {
//     $("#left-auto-attack").on("click", {side: "left"}, addAutoAttack);
//     $("#right-auto-attack").on("click", {side: "right"}, addAutoAttack);
// }
//
// //Adds an auto attack to the action queue
// function addAutoAttack(event) {
//     // Do nothing if a champion is already dead
//     var left_health = $("#left-health-text").text();
//     var right_health = $("#right-health-text").text()
//     if (left_health.includes("(0/") || right_health.includes("(0/")) {
//         return;
//     }
//     var outer = $('<div class="col-sm-1 my-1 px-0"></div>');
//     var inner = $('<div class="max-img mx-auto px-0"></div>').addClass(event.data.side + "-action");
//     var attack = $("<p class='mx-auto'>BA</p>");
//     outer.append(inner.append(attack)).attr("name", event.data.side + "-auto");
//     //Cap the action queue length to 60
//     if ($("div.action-queue > div.row").children().length < 60 &&
//             !$("#combat-time").text().includes("60.00")) {
//         $("div.action-queue > div.row").append(outer);
//         inner.on("click", function() {
//             $(outer).remove();
//             sendData();
//         });
//         attack.on("click", function() {
//             $(outer).remove()
//             sendData();
//         });
//         sendData();
//     }
// }
//
// //Enables ability buttons
// function enableAbilities() {
//     $(".ability,.cooldown").on("click", function() {
//         // Do nothing if a champion is already dead
//         var left_health = $("#left-health-text").text();
//         var right_health = $("#right-health-text").text()
//         if (left_health.includes("(0/") || right_health.includes("(0/")) {
//             return;
//         }
//         var outer = $('<div class="col-sm-1 my-1 px-0"></div>');
//         var inner = $('<div class="max-img mx-auto px-0"></div>');
//         var ability = $('<img class="img-fluid mx-auto">');
//         var target = $(event.target).parent().find("img");
//         var id = target.attr("id");
//         var side = "";
//         var button = "";
//         if (id.includes("left")) {
//             side = "left";
//         }
//         else if (id.includes("right")) {
//             side = "right";
//         }
//         if (id.includes("-q")) {
//             button = "-q";
//         }
//         else if (id.includes("-w")) {
//             button = "-w";
//         }
//         else if (id.includes("-e")) {
//             button = "-e";
//         }
//         if (id.includes("-r")) {
//             button = "-r";
//         }
//         var classes = target.attr("class").split(" ");
//         $.each(classes, function(index, item) {
//         if (item.includes("sprite-")) {
//             ability.addClass(item);
//         }
//         });
//         inner.addClass(side + "-action");
//         outer.append(inner.append(ability)).attr("name", side + button);
//         //Cap the action queue size to 60 actions
//         if ($("div.action-queue > div.row").children().length < 60 &&
//                 !$("#combat-time").text().includes("60.00")) {
//             $("div.action-queue > div.row").append(outer);
//             ability.on("click", function() {
//                 $(outer).remove();
//                 sendData();
//             });
//             sendData();
//         }
//     });
//     $(".ability").next().on("mouseenter", function() {
//         $(this).prev().popover("hide");
//         $(this).prev().popover("show");
//     });
//     $(".ability").next().on("mouseleave", function() {
//         if (!$(this).prev().is(":hover")) {
//             $(this).prev().popover("hide");
//         }
//     });
//     $(".passive").next().on("mouseenter", function() {
//         $(this).prev().popover("show");
//     });
//     $(".passive").next().on("mouseenter", function() {
//         if (!$(this).prev().is(":hover")) {
//             $(this).prev().popover("hide");
//         }
//     });
// }
//
// //Enables selectable ability ranks
// function enableAbilityRanks() {
//     var letters = ["q", "w", "e", "r"]
//     var side = ["left", "right"]
//     for (i = 0; i < side.length; ++i) {
//         for (j = 0; j < letters.length; ++j) {
//             $("." + side[i] + "-" + letters[j]).on("click", {side: side[i], letter: letters[j]}, changeAbilityLevel);
//         }
//     }
// }
//
// function changeAbilityLevel(event) {
//     var side = event.data.side;
//     var letter = event.data.letter;
//     var source = $(event.target);
//     if ($("#" + side + "-" + letter + "-level").text() == source.text()) {
//         return;
//     }
//     $("#" + side + "-" + letter + "-level").text(source.text());
//     sendData();
// }
//
// //Creates a list from the action queue
// function sortActionQueue() {
//     var children = $("div.action-queue > .row").children();
//     //Get all actions (child divs)
//     var actions = [];
//     for (i = 0; i < children.length; ++i) {
//         actions.push($(children[i]).attr("name"));
//     }
//     return actions
// }
//
// //Enables the reset action queue button (#reset-queue)
// function resetActionQueue(event) {
//     //Get all actions
//     var actions = $("div.action-queue > .row").children();
//     var send = actions.length > 0
//     for (i = 0; i < actions.length; ++i) {
//         $(actions[i]).remove();
//     }
//     if ($(event.target).prop('tagName') != "BUTTON") {
//         return;
//     }
//     if (send == true) {
//         sendData();
//     }
// }
//
// function makeRunesClickable() {
//     // Let the dropdown be clicked without closing
//     $leftRuneDropdown = $("#leftRunes").find(".dropdown-menu");
//     $leftRuneDropdown.on("click", function(e) {
//         e.stopPropagation();
//     });
//     $rightRuneDropdown = $("#rightRunes").find(".dropdown-menu");
//     $rightRuneDropdown.on("click", function(e) {
//         e.stopPropagation();
//     });
//     // Find the child Primary and Secondary buttons
//     $leftRuneButtons = $("#leftRunes").find(".btn-outline-dark");
//     $leftRuneButtons.on("click", function(e) {
//         var source = $(e.target);
//         source.addClass("active");
//         var id = source.attr("id");
//         if (id == "leftPrimaryRuneButton") {
//             $("#leftSecondaryRuneButton").removeClass("active");
//             $("#leftSecondaryRunes").css("display", "none");
//             $("#leftPrimaryRunes").css("display", "");
//         }
//         else {
//             $("#leftPrimaryRuneButton").removeClass("active");
//             $("#leftSecondaryRunes").css("display", "");
//             $("#leftPrimaryRunes").css("display", "none");
//             var selected = $("#leftPrimaryRunes").children(":first").find(".selected-rune").children(":first").attr("id");
//             if (selected == "leftPrimaryPrecision") {
//                 $("#leftSecondaryPrecision").parent().hide();
//                 $("#leftSecondarySorcery").parent().show();
//                 $("#leftSecondaryDomination").parent().show();
//                 $("#leftSecondaryResolve").parent().show();
//                 $("#leftSecondaryWhimsy").parent().show();
//                 $("#leftPrecisionSecondary").addClass("slide");
//             }
//             else if ( selected == "leftPrimaryDomination") {
//                 $("#leftSecondaryPrecision").parent().show();
//                 $("#leftSecondarySorcery").parent().show();
//                 $("#leftSecondaryDomination").parent().hide();
//                 $("#leftSecondaryResolve").parent().show();
//                 $("#leftSecondaryWhimsy").parent().show();
//                 $("#leftDominationSecondary").addClass("slide");
//             }
//             else if ( selected == "leftPrimarySorcery") {
//                 $("#leftSecondaryPrecision").parent().show();
//                 $("#leftSecondarySorcery").parent().hide();
//                 $("#leftSecondaryDomination").parent().show();
//                 $("#leftSecondaryResolve").parent().show();
//                 $("#leftSecondaryWhimsy").parent().show();
//                 $("#leftSorcerySecondary").addClass("slide");
//             }
//             else if ( selected == "leftPrimaryResolve") {
//                 $("#leftSecondaryPrecision").parent().show();
//                 $("#leftSecondarySorcery").parent().show();
//                 $("#leftSecondaryDomination").parent().show();
//                 $("#leftSecondaryResolve").parent().hide();
//                 $("#leftSecondaryWhimsy").parent().show();
//                 $("#leftResolveSecondary").addClass("slide");
//             }
//             else if ( selected == "leftPrimaryWhimsy") {
//                 $("#leftSecondaryPrecision").parent().show();
//                 $("#leftSecondarySorcery").parent().show();
//                 $("#leftSecondaryDomination").parent().show();
//                 $("#leftSecondaryResolve").parent().show();
//                 $("#leftSecondaryWhimsy").parent().hide();
//                 $("#leftWhimsySecondary").addClass("slide");
//             }
//         }
//         e.stopPropagation();
//     });
//     $rightRuneButtons = $("#rightRunes").find(".btn-outline-dark");
//     $rightRuneButtons.on("click", function(e) {
//         var source = $(e.target);
//         source.addClass("active");
//         var id = source.attr("id");
//         if (id == "rightPrimaryRuneButton") {
//             $("#rightSecondaryRuneButton").removeClass("active");
//             $("#rightSecondaryRunes").css("display", "none");
//             $("#rightPrimaryRunes").css("display", "");
//         }
//         else {
//             $("#rightPrimaryRuneButton").removeClass("active");
//             $("#rightSecondaryRunes").css("display", "");
//             $("#rightPrimaryRunes").css("display", "none");
//             var selected = $("#rightPrimaryRunes").children(":first").find(".selected-rune").children(":first").attr("id");
//             if (selected == "rightPrimaryPrecision") {
//                 $("#rightSecondaryPrecision").parent().hide();
//                 $("#rightSecondarySorcery").parent().show();
//                 $("#rightSecondaryDomination").parent().show();
//                 $("#rightSecondaryResolve").parent().show();
//                 $("#rightSecondaryWhimsy").parent().show();
//                 $("#rightPrecisionSecondary").addClass("slide");
//             }
//             else if ( selected == "rightPrimaryDomination") {
//                 $("#rightSecondaryPrecision").parent().show();
//                 $("#rightSecondarySorcery").parent().show();
//                 $("#rightSecondaryDomination").parent().hide();
//                 $("#rightSecondaryResolve").parent().show();
//                 $("#rightSecondaryWhimsy").parent().show();
//                 $("#rightDominationSecondary").addClass("slide");
//             }
//             else if ( selected == "rightPrimarySorcery") {
//                 $("#rightSecondaryPrecision").parent().show();
//                 $("#rightSecondarySorcery").parent().hide();
//                 $("#rightSecondaryDomination").parent().show();
//                 $("#rightSecondaryResolve").parent().show();
//                 $("#rightSecondaryWhimsy").parent().show();
//                 $("#rightSorcerySecondary").addClass("slide");
//             }
//             else if ( selected == "rightPrimaryResolve") {
//                 $("#rightSecondaryPrecision").parent().show();
//                 $("#rightSecondarySorcery").parent().show();
//                 $("#rightSecondaryDomination").parent().show();
//                 $("#rightSecondaryResolve").parent().hide();
//                 $("#rightSecondaryWhimsy").parent().show();
//                 $("#rightResolveSecondary").addClass("slide");
//             }
//             else if ( selected == "rightPrimaryWhimsy") {
//                 $("#rightSecondaryPrecision").parent().show();
//                 $("#rightSecondarySorcery").parent().show();
//                 $("#rightSecondaryDomination").parent().show();
//                 $("#rightSecondaryResolve").parent().show();
//                 $("#rightSecondaryWhimsy").parent().hide();
//                 $("#rightWhimsySecondary").addClass("slide");
//             }
//         }
//         e.stopPropagation();
//     });
//     var runes = $(".rune");
//     for (i = 0; i < runes.length; ++i) {
//         $(runes[i]).parent().on("click", function(e) {
//             var source = $(e.target);
//             if (!source.hasClass(".col.py-2") && !source.parent().hasClass("row")) {
//                 source = source.parent();
//             }
//             var id = source.find("img").attr("id");
//             if (!id.includes("Primary") && !id.includes("Secondary")) {
//                 var grandparent = source.parent().parent();
//                 //See if "id" attribute exists on grandparent
//                 if (grandparent.is("[id]")) {
//                     if (grandparent.attr("id").includes("Secondary")) {
//                         var selectedRunes = grandparent.find("[count]");
//                         if (source.hasClass("selected-rune")) {
//                             source.removeClass("selected-rune");
//                             if (source.parent().attr("count") == "2") {
//                                 source.parent().removeAttr("count");
//                             }
//                             else {
//                                 grandparent.find("[count='2']").attr("count", "1");
//                                 source.parent().removeAttr("count");
//                             }
//                         }
//                         else {
//                             if (selectedRunes.length == 0) {
//                                 source.addClass("selected-rune");
//                                 source.parent().attr("count", "1");
//                             }
//                             else if (selectedRunes.length == 1) {
//                                 if (source.parent().is("[count]")) {
//                                     source.siblings().removeClass("selected-rune");
//                                     source.addClass("selected-rune");
//                                 }
//                                 else {
//                                     source.addClass("selected-rune");
//                                     source.parent().attr("count", "2");
//                                 }
//                             }
//                             else if (selectedRunes.length == 2) {
//                                 if (source.parent().is("[count]")) {
//                                     source.siblings().removeClass("selected-rune");
//                                     source.addClass("selected-rune");
//                                 }
//                                 else {
//                                     grandparent.find("[count='1']").removeAttr("count").children().removeClass("selected-rune");
//                                     grandparent.find("[count='2']").attr("count", "1");
//                                     source.addClass("selected-rune");
//                                     source.parent().attr("count", "2");
//                                 }
//                             }
//                         }
//                     }
//                     else {
//                         if (source.hasClass("selected-rune")) {
//                             source.removeClass("selected-rune");
//                         }
//                         else {
//                             source.addClass("selected-rune");
//                             source.siblings().removeClass("selected-rune");
//                         }
//                     }
//                 }
//                 else {
//                     source.siblings().removeClass("selected-rune");
//                     if (source.hasClass("selected-rune")) {
//                         return;
//                     }
//                     source.addClass("selected-rune");
//                 }
//                 sendData();
//             }
//             else {
//                 source.siblings().removeClass("selected-rune");
//                 if (source.hasClass("selected-rune")) {
//                     return;
//                 }
//                 source.addClass("selected-rune");
//                 sendData();
//             }
//
//         });
//     }
// }
//
// // Enables slide toggling for rune pages
// function enableRunePageSwitching() {
//     $("#leftPrimaryPrecision").parent().on("click", function(e) {
//         hideRunePages("#leftPrimaryRunes");
//         $("#leftPrecisionPrimary").removeClass("slide");
//     });
//     $("#leftPrimaryDomination").parent().on("click", function(e) {
//         hideRunePages("#leftPrimaryRunes");
//         $("#leftDominationPrimary").removeClass("slide");
//     });
//     $("#leftPrimarySorcery").parent().on("click", function(e) {
//         hideRunePages("#leftPrimaryRunes");
//         $("#leftSorceryPrimary").removeClass("slide");
//     });
//     $("#leftPrimaryResolve").parent().on("click", function(e) {
//         hideRunePages("#leftPrimaryRunes");
//         $("#leftResolvePrimary").removeClass("slide");
//     });
//     $("#leftPrimaryWhimsy").parent().on("click", function(e) {
//         hideRunePages("#leftPrimaryRunes");
//         $("#leftWhimsyPrimary").removeClass("slide");
//     });
//     $("#leftSecondaryPrecision").parent().on("click", function(e) {
//         hideRunePages("#leftSecondaryRunes");
//         $("#leftPrecisionSecondary").removeClass("slide");
//     });
//     $("#leftSecondaryDomination").parent().on("click", function(e) {
//         hideRunePages("#leftSecondaryRunes");
//         $("#leftDominationSecondary").removeClass("slide");
//     });
//     $("#leftSecondarySorcery").parent().on("click", function(e) {
//         hideRunePages("#leftSecondaryRunes");
//         $("#leftSorcerySecondary").removeClass("slide");
//     });
//     $("#leftSecondaryResolve").parent().on("click", function(e) {
//         hideRunePages("#leftSecondaryRunes");
//         $("#leftResolveSecondary").removeClass("slide");
//     });
//     $("#leftSecondaryWhimsy").parent().on("click", function(e) {
//         hideRunePages("#leftSecondaryRunes");
//         $("#leftWhimsySecondary").removeClass("slide");
//     });
//     $("#rightPrimaryPrecision").parent().on("click", function(e) {
//         hideRunePages("#rightPrimaryRunes");
//         $("#rightPrecisionPrimary").removeClass("slide");
//     });
//     $("#rightPrimaryDomination").parent().on("click", function(e) {
//         hideRunePages("#rightPrimaryRunes");
//         $("#rightDominationPrimary").removeClass("slide");
//     });
//     $("#rightPrimarySorcery").parent().on("click", function(e) {
//         hideRunePages("#rightPrimaryRunes");
//         $("#rightSorceryPrimary").removeClass("slide");
//     });
//     $("#rightPrimaryResolve").parent().on("click", function(e) {
//         hideRunePages("#rightPrimaryRunes");
//         $("#rightResolvePrimary").removeClass("slide");
//     });
//     $("#rightPrimaryWhimsy").parent().on("click", function(e) {
//         hideRunePages("#rightPrimaryRunes");
//         $("#rightWhimsyPrimary").removeClass("slide");
//     });
//     $("#rightSecondaryPrecision").parent().on("click", function(e) {
//         hideRunePages("#rightSecondaryRunes");
//         $("#rightPrecisionSecondary").removeClass("slide");
//     });
//     $("#rightSecondaryDomination").parent().on("click", function(e) {
//         hideRunePages("#rightSecondaryRunes");
//         $("#rightDominationSecondary").removeClass("slide");
//     });
//     $("#rightSecondarySorcery").parent().on("click", function(e) {
//         hideRunePages("#rightSecondaryRunes");
//         $("#rightSorcerySecondary").removeClass("slide");
//     });
//     $("#rightSecondaryResolve").parent().on("click", function(e) {
//         hideRunePages("#rightSecondaryRunes");
//         $("#rightResolveSecondary").removeClass("slide");
//     });
//     $("#rightSecondaryWhimsy").parent().on("click", function(e) {
//         hideRunePages("#rightSecondaryRunes");
//         $("#rightWhimsySecondary").removeClass("slide");
//     });
// }
//
// //Helper function to hide all rune pages/trees
// function hideRunePages(parentPage) {
//     var visible = $(parentPage +  " .rune-page").not(".slide");
//     for (i = 0; i < visible.length; ++i) {
//         $(visible[i]).addClass("slide");
//     }
// }
//
// function getRunes(side) {
//     var primaryType = $("#" + side + "PrimaryRunes").children(":first").find(".selected-rune").find("img").attr("id");
//     var secondaryType = $("#" + side + "SecondaryRunes").children(":first").find(".selected-rune").find("img").attr("id");
//     var runes = []
//     if (primaryType != undefined && primaryType !== false) {
//         if (primaryType.includes("Precision")) {
//             var primaryRunes = $("#" + side + "PrecisionPrimary").find(".selected-rune");
//             for (i = 0; i < primaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(primaryRunes[i]).find("img").attr("id")));
//             }
//         }
//         else if (primaryType.includes("Domination")) {
//             var primaryRunes = $("#" + side + "DominationPrimary").find(".selected-rune");
//             for (i = 0; i < primaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(primaryRunes[i]).find("img").attr("id")));
//             }
//         }
//         else if (primaryType.includes("Sorcery")) {
//             var primaryRunes = $("#" + side + "SorceryPrimary").find(".selected-rune");
//             for (i = 0; i < primaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(primaryRunes[i]).find("img").attr("id")));
//             }
//         }
//         else if (primaryType.includes("Resolve")) {
//             var primaryRunes = $("#" + side + "ResolvePrimary").find(".selected-rune");
//             for (i = 0; i < primaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(primaryRunes[i]).find("img").attr("id")));
//             }
//         }
//         else if (primaryType.includes("Whimsy")) {
//             var primaryRunes = $("#" + side + "WhimsyPrimary").find(".selected-rune");
//             for (i = 0; i < primaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(primaryRunes[i]).find("img").attr("id")));
//             }
//         }
//     }
//     if (secondaryType != undefined && secondaryType !== false) {
//         if (secondaryType.includes("Precision")) {
//             var secondaryRunes = $("#" + side + "PrecisionSecondary").find(".selected-rune");
//             for (i = 0; i < secondaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(secondaryRunes[i]).find("img").attr("id")));
//             }
//         }
//         else if (secondaryType.includes("Domination")) {
//             var secondaryRunes = $("#" + side + "DominationSecondary").find(".selected-rune");
//             for (i = 0; i < secondaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(secondaryRunes[i]).find("img").attr("id")));
//             }
//         }
//         else if (secondaryType.includes("Sorcery")) {
//             var secondaryRunes = $("#" + side + "SorcerySecondary").find(".selected-rune");
//             for (i = 0; i < secondaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(secondaryRunes[i]).find("img").attr("id")));
//             }
//         }
//         else if (secondaryType.includes("Resolve")) {
//             var secondaryRunes = $("#" + side + "ResolveSecondary").find(".selected-rune");
//             for (i = 0; i < secondaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(secondaryRunes[i]).find("img").attr("id")));
//             }
//         }
//         else if (secondaryType.includes("Whimsy")) {
//             var secondaryRunes = $("#" + side + "WhimsySecondary").find(".selected-rune");
//             for (i = 0; i < secondaryRunes.length; ++i) {
//                 runes.push(convertRuneToName($(secondaryRunes[i]).find("img").attr("id")));
//             }
//         }
//     }
//     var runeStats = $("#" + side + "Runes").find(".row.mx-auto.border-top").find(".selected-rune");
//     if (runeStats != undefined && runeStats !== false) {
//         for (i = 0; i < runeStats.length; ++i) {
//             runes.push(convertRuneToName($(runeStats[i]).find("img").attr("id")));
//         }
//     }
//     return runes;
// }
//
// function getCustomizations(side) {
//     var configured = {};
//     if (!$("#" + side + "-customizations").attr("champion")) {
//         return;
//     }
//     var customizations = $("#" + side + "-customizations :input[type='number']");
//     for (var i = 0; i < customizations.length; ++i) {
//         var target = $(customizations[i])
//         var original = Number(target.attr("original"));
//         var current = Number(target.val());
//         if ((current || current === 0) && current != original) {
//             configured[target.attr("id").replace(/-/g, "_")] = current;
//         }
//     }
//     return configured;
// }
//
// //Takes a rune's id and returns the appropriate name
// function convertRuneToName(id) {
//     if (id.includes("PressTheAttack")) {
//         return "Press the Attack";
//     }
//     else if (id.includes("LethalTempo")) {
//         return "Lethal Tempo";
//     }
//     else if (id.includes("FleetFootwork")) {
//         return "Fleet Footwork";
//     }
//     else if (id.includes("Conqueror")) {
//         return "Conqueror";
//     }
//     else if (id.includes("Overheal")) {
//         return "Overheal";
//     }
//     else if (id.includes("Triumph")) {
//         return "Triumph";
//     }
//     else if (id.includes("PresenceOfMind")) {
//         return "Presence of Mind";
//     }
//     else if (id.includes("Alacrity")) {
//         return "Legend: Alacrity";
//     }
//     else if (id.includes("Tenacity")) {
//         return "Legend: Tenacity";
//     }
//     else if (id.includes("Bloodline")) {
//         return "Legend: Bloodline";
//     }
//     else if (id.includes("CoupDeGrace")) {
//         return "Coup de Grace";
//     }
//     else if (id.includes("CutDown")) {
//         return "Cut Down";
//     }
//     else if (id.includes("LastStand")) {
//         return "Last Stand";
//     }
//     else if (id.includes("Electrocute")) {
//         return "Electrocute";
//     }
//     else if (id.includes("Predator")) {
//         return "Predator";
//     }
//     else if (id.includes("DarkHarvest")) {
//         return "Dark Harvest";
//     }
//     else if (id.includes("HailOfBlades")) {
//         return "Hail of Blades";
//     }
//     else if (id.includes("CheapShot")) {
//         return "Cheap Shot";
//     }
//     else if (id.includes("TasteOfBlood")) {
//         return "Taste of Blood";
//     }
//     else if (id.includes("SuddenImpact")) {
//         return "Sudden Impact";
//     }
//     else if (id.includes("ZombieWard")) {
//         return "Zombie Ward";
//     }
//     else if (id.includes("GhostPoro")) {
//         return "Ghost Poro";
//     }
//     else if (id.includes("EyeballCollection")) {
//         return "Eyeball Collection";
//     }
//     else if (id.includes("RavenousHunter")) {
//         return "Ravenous Hunter";
//     }
//     else if (id.includes("IngeniousHunter")) {
//         return "Ingenious Hunter";
//     }
//     else if (id.includes("RelentlessHunter")) {
//         return "Relentless Hunter";
//     }
//     else if (id.includes("UltimateHunter")) {
//         return "Ultimate Hunter";
//     }
//     else if (id.includes("SummonAery")) {
//         return "Summon Aery";
//     }
//     else if (id.includes("ArcaneComet")) {
//         return "Arcane Comet";
//     }
//     else if (id.includes("PhaseRush")) {
//         return "Phase Rush";
//     }
//     else if (id.includes("NullifyingOrb")) {
//         return "Nullifying Orb";
//     }
//     else if (id.includes("ManaflowBand")) {
//         return "Manaflow Band";
//     }
//     else if (id.includes("NimbusCloak")) {
//         return "Nimbus Cloak";
//     }
//     else if (id.includes("Transcendence")) {
//         return "Transcendence";
//     }
//     else if (id.includes("Celerity")) {
//         return "Celerity";
//     }
//     else if (id.includes("AbsoluteFocus")) {
//         return "Absolute Focus";
//     }
//     else if (id.includes("Scorch")) {
//         return "Scorch";
//     }
//     else if (id.includes("Waterwalking")) {
//         return "Waterwalking";
//     }
//     else if (id.includes("GatheringStorm")) {
//         return "Gathering Storm";
//     }
//     else if (id.includes("Grasp")) {
//         return "Grasp of the Undying";
//     }
//     else if (id.includes("Aftershock")) {
//         return "Aftershock";
//     }
//     else if (id.includes("Guardian")) {
//         return "Guardian";
//     }
//     else if (id.includes("Demolish")) {
//         return "Demolish";
//     }
//     else if (id.includes("FontOfLife")) {
//         return "Font of Life";
//     }
//     else if (id.includes("ShieldBash")) {
//         return "Shield Bash";
//     }
//     else if (id.includes("Conditioning")) {
//         return "Conditioning";
//     }
//     else if (id.includes("SecondWind")) {
//         return "Second Wind";
//     }
//     else if (id.includes("BonePlating")) {
//         return "Bone Plating";
//     }
//     else if (id.includes("Overgrowth")) {
//         return "Overgrowth";
//     }
//     else if (id.includes("Revitalize")) {
//         return "Revitalize";
//     }
//     else if (id.includes("Unflinching")) {
//         return "Unflinching";
//     }
//     else if (id.includes("GlacialAugment")) {
//         return "Glacial Augment";
//     }
//     else if (id.includes("UnsealedSpellbook")) {
//         return "Unsealed Spellbook";
//     }
//     else if (id.includes("MasterKey")) {
//         return "Prototype: Omnistone";
//     }
//     else if (id.includes("HextechFlashtraption")) {
//         return "Hextech Flashtraption";
//     }
//     else if (id.includes("MagicalFootwear")) {
//         return "Magical Footwear";
//     }
//     else if (id.includes("PerfectTiming")) {
//         return "Perfect Timing";
//     }
//     else if (id.includes("FuturesMarket")) {
//         return "Future's Market";
//     }
//     else if (id.includes("MinionDematerializer")) {
//         return "Minion Dematerializer";
//     }
//     else if (id.includes("BiscuitDelivery")) {
//         return "Biscuit Delivery";
//     }
//     else if (id.includes("CosmicInsight")) {
//         return "Cosmic Insight";
//     }
//     else if (id.includes("ApproachVelocity")) {
//         return "Approach Velocity";
//     }
//     else if (id.includes("TimeWarpTonic")) {
//         return "Time Warp Tonic";
//     }
//     else if (id.includes("Adaptive")) {
//         return "Adaptive Force";
//     }
//     else if (id.includes("AttackSpeed")) {
//         return "Scaling Attack Speed";
//     }
//     else if (id.includes("AbilityHaste")) {
//         return "Ability Haste";
//     }
//     else if (id.includes("Armor")) {
//         return "Bonus Armor";
//     }
//     else if (id.includes("MagicResist")) {
//         return "Bonus Magic Resist";
//     }
//     else if (id.includes("Health")) {
//         return "Scaling Health";
//     }
//     else {
//         console.log("UNKNOWN:" + id);
//     }
// }
//
// function enableRuneTooltips() {
//     var items = $("#leftRunes").find(".rune");
//     items.on("mouseenter", getRuneTooltip);
//     items = $("#rightRunes").find(".rune");
//     items.on("mouseenter", getRuneTooltip);
// }
//
// //Use a GET request to retrieve rune tooltips
// function getRuneTooltip(event) {
//     var source = $(event.target);
//     if (source.attr("data-content") == "") {
//         var name = convertRuneToName(source.attr("id"));
//         //Get both item images
//         if (name == "") {
//             return;
//         }
//         $.ajax ({
//             url: "/rune/" + name,
//             type: "GET",
//             success: function(response) {
//                 source.attr("data-content", response)
//             }
//         });
//     }
//     else {
//         return
//     }
// }
//
// // Make item filters clickable, don't exit on click
// function enableItemFilters(side) {
//     $("#" + side + "-item-filter-btn").on("click", function(e) {
//         // Determine if we use normal or stacked item filters by seeing if normal would fall off the screen
//         var filters = $("#" + side + "-item-filter-options");
//         var leftCoord = Number(filters.css("left").replace('px','')) + $("#" + side + "-item-list").offset().left;
//         var filterWidth = filters.width();
//         if (leftCoord < 0 || leftCoord + filterWidth > $(window).width()) {
//             $("#" + side + "-item-filter-options").css("display", "none");
//             $("#" + side + "-item-filter-options-stacked").css("display", "block");
//             filters = $("#" + side + "-item-filter-options-stacked");
//         }
//         else {
//             $("#" + side + "-item-filter-options").css("display", "block");
//             $("#" + side + "-item-filter-options-stacked").css("display", "none");
//              $("#" + side + "-filter-placeholder").hide();
//         }
//         // Toggle the filter visibility on and off
//         if (filters.hasClass("show")) {
//             filters.removeClass("show");
//             filters.css("display", "none");
//             $("#" + side + "-filter-placeholder").hide();
//         }
//         else {
//             filters.addClass("show");
//             filters.css("display", "block");
//             if ($("#" + side + "-item-filter-options-stacked").css("display") == "block") {
//                 var placeholder = $("#" + side + "-filter-placeholder");
//                 placeholder.show();
//                 if (placeholder.width() == 0) {
//                     placeholder.css({"width": "100%", "height": filters.height() + "px"});
//                 }
//             }
//         }
//         // Set an attribute used to save filter "state", used to see if filters should be visible again
//         if ($(this).attr("expanded") == "true") {
//             $(this).attr("expanded", "false");
//         }
//         else {
//             $(this).attr("expanded", "true");
//         }
//         e.stopPropagation();
//     });
//     // Actual item filter functionality
//     $("#" + side + "-item-filter-options").find(":input").on("change", {side: side}, filterItems)
//     $("#" + side + "-item-filter-options-stacked").find(":input").on("change", {side: side}, filterItems)
//     // Prevent clicking inside the options from closing the options
//     $("#" + side + "-item-filter-options").on("click", function(e) {
//         e.stopPropagation();
//     });
//     // Hide the options when clicking outside of the dropdown
//     $("body").on("click", function() {
//         if (!$("#" + side + "-item-list").has($(this)).length) {
//             $("#" + side + "-item-filter-options").removeClass("show");
//             $("#" + side + "-item-filter-options").css("display", "none");
//         }
//     });
//     // Prevent clicking the "other" add-items button from keeping filters open
//     $("#add-items-" + side).on("click", function() {
//         var opposite = "right";
//         if (side == "right") {
//             opposite = "left";
//         }
//         // Set location and size of the filter options
//         var currentWidth = $("#" + side + "-item-list").width();
//         if (side == "left") {
//             currentWidth = currentWidth / 2 - $("#add-items-" + side).parent().width() / 2 +
//                             $("#" + side + "-item-filter-options").width();
//             $("#" + side + "-item-filter-options").css("left", -currentWidth + "px");
//         }
//         else {
//             currentWidth = currentWidth / 2 + $("#add-items-" + side).parent().width() / 2
//             $("#" + side + "-item-filter-options").css("left", currentWidth + "px");
//         }
//         $("#" + opposite + "-item-filter-options").removeClass("show");
//         $("#" + opposite + "-item-filter-options").css("display", "none");
//         // Show the item filters if we left them showing before closing the dropdown
//         if ($("#" + side + "-item-filter-btn").attr("expanded") == "true") {
//             if (!$("#" + side + "-item-list").hasClass("show")) {
//                 $("#" + side + "-item-filter-options").addClass("show");
//                 $("#" + side + "-item-filter-options").css("display", "block");
//             }
//             else {
//                 $("#" + side + "-item-filter-options").removeClass("show");
//                 $("#" + side + "-item-filter-options").css("display", "none");
//             }
//         }
//     });
// }
//
// function filterItems(event) {
//     // Get all checked buttons/filters, show all items
//     var src = $(event.target).parent().parent().parent();
//     var checked = $("#" + event.data.side + "-item-filter-options").find(":checked");
//     if (src.attr("id").includes("-stacked")) {
//         checked = $("#" + event.data.side + "-item-filter-options-stacked").find(":checked");
//     }
//     var visible = $("#" + event.data.side + "-item-options").find(".col-3.bg-hover");
//     $(visible).hide().attr("filtered", "true");
//     // Apply item filtering by comparing attribute values to filter values
//     $(checked).each(function() {
//         // Filter by rarity
//         if ($(this).attr("name") == "rarity") {
//             var rarity = $(this).val();
//             if (rarity != "Any") {
//                 if (rarity == "Normal") {
//                     rarity = "None";
//                 }
//                 visible = $(visible).find("[item-rarity='" + rarity + "']").parent();
//             }
//         }
//         else {
//             var stat = $(this).val();
//             if (stat == "Movement") {
//                 visible = $(visible).find("[item-tags*=' Boots '], [item-tags*=' NonbootsMovement ']").parent();
//             }
//             else {
//                 // Include an extra space in the search to prevent overlap (EX: Health matches HealthRegen)
//                 visible = $(visible).find("[item-tags*=' " + stat + " ']").parent();
//             }
//         }
//     });
//     $(visible).show().attr("filtered", "false");
//     // Re-apply text-based search parameters
//     var itemSearchBar = $("#" + event.data.side + "-item-search");
//     searchItems($(itemSearchBar).val(), itemSearchBar);
// }
//
// function enableCustomizableStats() {
//     var sides = ["left", "right"];
//     for (i = 0; i < sides.length; ++i) {
//         $("#" + sides[i] + "-customizations :input[type='number']").focusout(function() {
//             if (!$(this).val()) {
//                 $(this).val($(this).attr("original"));
//             }
//             if ($(this).val() < 0) {
//                 $(this).val(0);
//             }
//             sendOnChange($(this));
//         });
//     }
// }
//
// function sendOnChange(target) {
//     if (target.val()) {
//         if (target.is("[previous]")) {
//             if (target.attr("previous") != target.val()) {
//                 target.attr("previous", target.val());
//                 sendData();
//             }
//         }
//         else {
//             if (target.val()) {
//                 target.attr("previous", target.val());
//                 sendData();
//             }
//         }
//     }
//     else if (target.is("[previous]")) {
//         target.removeAttr("previous");
//         sendData();
//     }
// }
//
// function modifyViewableElements() {
//     var width = $(window).width();
//     // ~1170 is a cutoff where things look weird, adjust before then
//     if (Number(width) < 1180) {
//         $("#left-side").hide();
//         $("#right-side").hide();
//         $("#left-champ").addClass("col-sm-3").removeClass("col-sm-2");
//         $("#right-champ").addClass("col-sm-3").removeClass("col-sm-2");
//         $("#left-items").addClass("col-sm-3").removeClass("col-sm-2");
//         $("#right-items").addClass("col-sm-3").removeClass("col-sm-2");
//     }
//     else {
//         $("#left-side").show();
//         $("#right-side").show();
//         $("#left-champ").removeClass("col-sm-3").addClass("col-sm-2");
//         $("#right-champ").removeClass("col-sm-3").addClass("col-sm-2");
//         $("#left-items").removeClass("col-sm-3").addClass("col-sm-2");
//         $("#right-items").removeClass("col-sm-3").addClass("col-sm-2");
//     }
//     // Re-order right runes/level depending on iff they are stacked
//     // Switch to dropleft/dropright if stacked
//     var rightRunes = $("#rightRunes").parent();
//     var rightLevel = $("#right-level").parent();
//     if (rightRunes.offset().top != rightLevel.offset().top) {
//         rightLevel.insertBefore(rightRunes);
//         $("#right-level").addClass("dropleft").removeClass("dropdown").find(".dropdown-menu").
//             removeClass("dropdown-menu-center");
//         $("#left-level").addClass("dropright").removeClass("dropdown").find(".dropdown-menu").
//             removeClass("dropdown-menu-center");
//     }
//     else {
//         rightRunes.insertBefore(rightLevel);
//         $("#right-level").addClass("dropdown").removeClass("dropleft").find(".dropdown-menu").
//             addClass("dropdown-menu-center");
//         $("#left-level").addClass("dropdown").removeClass("dropright").find(".dropdown-menu").
//             addClass("dropdown-menu-center");
//     }
// }
//
// function enableHideChampCustomizations() {
//     var sides = ["left", "right"];
//     for (i = 0; i < sides.length; ++i) {
//         var target = "#" + sides[i] + "-champion-customizations";
//         $("#" + sides[i] + "-champ-cust-show").on("click", {elem: target}, hideElementOnClick)
//     }
// }
//
// function hideElementOnClick(e) {
//         var target = $(e.data.elem);
//         var button = $(e.target);
//         target.toggle();
//         if (target.is(":hidden")) {
//             button.html("show");
//         }
//         else {
//             button.html("hide");
//         }
// }
//
// function resetChildCustomizations() {
//     $(".stat-reset").on("click", function(e) {
//         var modified = false;
//         var source = $(e.target);
//         var target = source.parent().next();
//         do {
//             var elems = target.find(":input");
//             for (i = 0; i < elems.length; ++i) {
//                 var input = $(elems[i]);
//                 if (input.val() != input.attr("original")) {
//                     input.val(input.attr("original"));
//                     modified = true;
//                 }
//             }
//             target = target.next();
//         }
//         while (target.find(":input[type=number]").length > 0)
//         if (modified) {
//             sendData();
//         }
//     });
// }