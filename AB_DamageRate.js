// =============================================================================
// AB_DamageRate.js
// Version: 0.01
// -----------------------------------------------------------------------------
// Copyright (c) 2016 ヱビ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================


/*:
 * @plugindesc  物理・魔法・回復の威力の倍率を設定できるようにします。
 * @author ヱビ
 * 
 * 
 * @help
 * ============================================================================
 * どんなプラグイン？
 * ============================================================================
 * 
 * 物理攻撃倍率
 *   PAR (Physical Attack Rate)
 *   物理攻撃で与えるダメージの倍率です。
 * 
 * 魔法攻撃倍率
 *   MAR (Magic Attack Rate)
 *   魔法攻撃で与えるダメージの倍率です。
 * 
 * 回復量倍率
 *   HPR (Heal Power Rate)
 *   味方を回復するときの回復量の倍率です。
 * 
 * ============================================================================
 * メモタグ
 * ============================================================================
 * 
 * ステート、武器、防具のメモ欄
 * 
 * <PARPlus: 式>
 * <MARPlus: 式>
 * <HPRPlus: 式>
 * 
 * こちらは加算式で、攻撃力上昇に使えます。
 * 
 * 
 * <PARRate: 式>
 * <MARRate: 式>
 * <HPRRate: 式>
 * 
 * こちらは倍率なので、攻撃力低下に使えます。
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・クレジット表記は不要
 * ・営利目的で使用可
 * ・改変可
 *     ただし、ソースコードのヘッダのライセンス表示は残してください。
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * 
 * 
 */

(function() {

//=============================================================================
// Game_Action
//=============================================================================
	var _Game_Action_prototype_makeDamageValue
				= Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function (target, critical) {
		var value = _Game_Action_prototype_makeDamageValue.call(this, target, critical);
		var item = this.item();
		var a = this.subject();
		var b = target;
		var user = this.subject();
		var subject = this.subject();
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		var states = subject.states();
		var equips = subject.isActor() ? subject.equips() : [];
		var rate = 1;
		var ratePlus = 0;
		//var equipPlus = 0;
		if (value > 0) {
			if (this.isPhysical()) {
				states.forEach(function(state){
					if (state.meta.PARPlus) {
						var rate2 = eval(state.meta.PARPlus);
						//console.log("PARPlus:");
						//console.log(rate2);
						if (!isNaN(rate2)) ratePlus += rate2;
					}
					if (state.meta.PARRate) {
						var rate2 = eval(state.meta.PARRate);
						if (!isNaN(rate2)) rate *= rate2;
					}
				});
				equips.forEach(function(equip){
					if (!equip) return;
					if (equip.meta.PARPlus) {
						var rate2 = eval(equip.meta.PARPlus);
						if (!isNaN(rate2)) ratePlus += rate2;
					}
					if (equip.meta.PARRate) {
						var rate2 = eval(equip.meta.PARRate);
						if (!isNaN(rate2)) rate *= rate2;
					}
				});
			} else if (this.isMagical()) {
				states.forEach(function(state){
					if (state.meta.MARPlus) {
						var rate2 = eval(state.meta.MARPlus);
						if (!isNaN(rate2)) ratePlus += rate2;
					}
					if (state.meta.MARRate) {
						var rate2 = eval(state.meta.MARRate);
						if (!isNaN(rate2)) rate *= rate2;
					}
				});
				equips.forEach(function(equip){
					if (!equip) return;
					if (equip.meta.MARPlus) {
						var rate2 = eval(equip.meta.MARPlus);
						if (!isNaN(rate2)) ratePlus += rate2;
					}
					if (equip.meta.MARRate) {
						var rate2 = eval(equip.meta.MARRate);
						if (!isNaN(rate2)) rate *= rate2;
					}
				});
			}
		} else {
			states.forEach(function(state){
				if (state.meta.HPRPlus) {
					var rate2 = eval(state.meta.HPRPlus);
					if (!isNaN(rate2)) ratePlus += rate2;
				}
				if (state.meta.HPRRate) {
					var rate2 = eval(state.meta.HPRRate);
					if (!isNaN(rate2)) rate *= rate2;
				}
			});
			equips.forEach(function(equip){
				if (!equip) return;
				if (equip.meta.HPRPlus) {
					var rate2 = eval(equip.meta.HPRPlus);
					if (!isNaN(rate2)) ratePlus += rate2;
				}
				if (equip.meta.HPRRate) {
					var rate2 = eval(equip.meta.HPRRate);
					if (!isNaN(rate2)) rate *= rate2;
				}
			});
		}
		rate = (1+ratePlus)*rate;
		//console.log(rate);
		//console.log(value);

		//rate += Math.pow(equipPlus, 0.5);
		value *= rate;
		value = Math.round(value);
		//console.log(value);
		return value;
	};



	
})();