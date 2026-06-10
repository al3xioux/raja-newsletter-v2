// src/utils/generateHtml.js
import { formatPrice } from "./currency";

export default function generateHtml(blocks, header = "", footer = "", docTitle = "Newsletter", headerTexte = "", language = "fr") {

	// Fonction utilitaire pour ajouter -MOB avant .png
	function getMobileImageUrl(url) {
		if (typeof url !== "string") return url;
		return url.replace(/(\.png)$/i, "-MOB$1");
	}

	// Début du document
	let htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--[if !mso]><!-->
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" />

<title>${docTitle}</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');
</style>
<!--[if !mso]><!-->
<style type="text/css">
@font-face {
font-family:Open sans,Arial;
src: url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');
font-weight:normal;
font-style: normal;
}
</style>
<!--<![endif]-->

<style type="text/css">
/* Efface les espaces dans outlook - Bug entre les cellules */
table, td { border-collapse:collapse!important; position:relative!important; border-spacing:0!important; mso-table-lspace:0pt; mso-table-rspace:0pt; }
img { -ms-interpolation-mode: bicubic; border:0; display:block!important; }
/* */
html { width:100%; background-color:#EDF1F7; }
/* */
body {
	min-width:100%; width:100% !important;
	color:#393E46!important;
	background-color:#EDF1F7!important;
	font-family:Open sans,Arial,sans-serif!important;
	margin:0;
	padding:0;
	-webkit-font-smoothing: antialiased;
	-webkit-text-size-adjust: none;
	-ms-text-size-adjust: none;
	-ms-font-family:Open sans,Arial,sans-serif!important;
	font-size:12px;
}

/* Fixe le bug du texte coupé sur la droite et non visible sur certain Outlook */
td.resize_height td {
	padding-right: 20px;
	mso-hyphenate:none; /* Empêche d'avoir un trait d'union/hyphen généré par Outlook quand le texte n'est plus coupé */
}

/* ANDROID CENTER FIX */
div[style*="margin:16px 0;"] { margin:0 !important; }
</style>
<!--[if mso]>
<style>
body, table, td, span, a { font-family:Arial,sans-serif!important; text-decoration:none!important; }
table, td { border-collapse:collapse!important; position:relative!important; border-spacing:0!important; mso-table-lspace:0pt; mso-table-rspace:0pt; }
img { -ms-interpolation-mode: bicubic; border:0; display:block!important; }
</style>
<![endif]-->

<style type="text/css">
@media only screen and (max-width:600px){
.resize {width:100%!important; height:auto!important; }
.resize_bolder { width:100%!important; font-weight:700!important; }
.none { display:none!important; }
.view { display:block!important; }
.center { text-align:center!important;}
.center_table { text-align:center!important; margin:0 auto!important;}
.resize_w90 { width:90%!important; height:auto!important; padding:0!important; }
.resize_w96 { width:96%!important; height:auto!important; padding:0!important; }
.resize_w80 { width:80%!important; height:auto!important; padding:0!important; }
.resize_w70 { width:70%!important; height:auto!important; padding:0!important; }
.resize_w60 { width:60%!important; height:auto!important; padding:0!important; }
.resize_w50 { width:50%!important; height:auto!important; padding:0!important; }
.resize_w45 { width:45%!important; height:auto!important; padding:0!important; }
.resize_w40 { width:40%!important; height:auto!important; padding:0!important; }
.resize_w33 { width:33%!important; height:auto!important; padding:0!important; }
.resize_w30 { width:30%!important; height:auto!important; padding:0!important; }
.resize_gif { width:100%!important; }
.gifAnim { max-width:100%!important; width:100%!important; height:auto!important; margin:0!important; padding:0!important; }
.resize_height { height:auto!important; }
.resize_h10 { height:10px!important; width:auto!important; }
.resize_h20 { height:20px!important; width:auto!important; }
.resize_h30 { height:30px!important; width:auto!important; }
.resize_h40 { height:40px!important; width:auto!important; }
.resize_h46 { height:46px!important; width:auto!important; }
.resize_h50 { height:50px!important; width:auto!important; }
.resize_h90 { height:90px!important; width:auto!important; }
.resize_sep_noBorder { width:100%!important; height:auto!important; border:0 solid #F00000!important; }
.resize_sep_borderTop { width:100%!important; height:auto!important; border-top: 2px solid #EDF1F7!important; }
.resize_sep_borderBot { border-bottom:2px solid #276EF1!important; }
.resize_sep_borderBotGreen { border-bottom:2px solid #d9e367!important; }
.resize_text10 { font-size:10px!important; }
.resize_text11 { font-size:11px!important; }
.resize_text12 { font-size:12px!important; }
.resize_text14 { font-size:14px!important; }
.resize_text16 { font-size:16px!important; }
.resize_text18 { font-size:18px!important; }
.resize_text20 { font-size:20px!important; }
.resize_text22 { font-size:22px!important; }
.resize_text24 { font-size:24px!important; }
.resize_text26 { font-size:26px!important; }
.resize_text28 { font-size:28px!important; }
.resize_text30 { font-size:30px!important; }
.resize_text32 { font-size:32px!important; }
.resize_text36 { font-size:36px!important; }
.resize_textCat { font-size:16px!important; font-weight:600!important; color:#393E46!important; }
}
</style>
<!-- ////////////// Styles for template 3-col
////////////////////-->

<style>
/*  destockage RESPONSIVE 3-2 column DESKTOP  */

.tablePRD {
	float: left;
	box-sizing: border-box;
}
.td_tables_PRD {
	text-align: center;
}
.tdSIDE {
	box-sizing: border-box;
}
.tdPRD {
	padding: 16px 8px 0px 0px;
	margin: 0px;
}
</style>

<style type="text/css">
@media only screen and (max-width:600px) {
/*  destockage RESPONSIVE 3-2 column MOBILE  */
.tablePRD {
	width: 50% !important;
	padding: 0px !important;
}
.td_tables_PRD {
	width: auto !important;
}
.tdLEFT {
	width:30px !important;
}
.tdRIGHT {
	width: 25px !important;
}
.prd10 {
	display: inline-block !important;
}
}
</style>

<!-- ////////////// END Styles for template 3-col
////////////////////-->
</head>

<body>
<table class="resize" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#EDF1F7;">
	<tr><td style="display:none; font-size:12px;">${headerTexte}</td></tr>
	<tr>
		<td align="center">
${header}
`;

	blocks.forEach((item, index) => {
		switch (item.type) {
			case "oneProduct":
				htmlContent += `
					<!--07 BIG PDT - div-->
					<table class="resize" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#FFFFFF;">
						<tr>
							<td dir="ltr" style="text-align:center; vertical-align:top; font-size:0; background-color:#FFFFFF;">
								<!--[if (gte mso 9)|(IE)]>
								<table dir="ltr" width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
									<tr>
										<td width="50%" dir="ltr">
								<![endif]-->
								<div class="resize" dir="ltr" style="width:50%; display:inline-block; vertical-align:top;">
									<table class="resize" align="left" width="300" border="0" cellspacing="0" cellpadding="0" style="text-align: center; background-color:#FFFFFF;">
										<tr><td style="font-size:0; display:block; height:20px;">&nbsp;</td></tr>
										<tr>
											<td>
												<table class="resize" width="298" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
													<tr>
														<td style="font-size:0;"><a href="${item.data.one_productLink || "#"}" target="_blank"><img class="resize_w90" src="https://raja.scene7.com/is/image/Raja?template=TA-picture-200-XL&$image=${item.data.one_image || ""}&hei=600&wid=656&resMode=sharp4" width="297" height="272" style="display:block; padding:0; margin:0 auto; border:0; width:297px; height:272px;" alt="${item.data.one_title || ""}"/></a></td>
													</tr>
												</table>
											</td>
										</tr>
										<tr><td class="none" style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
									</table>
								</div>
								<!--[if (gte mso 9)|(IE)]>
										</td>
										<td width="50%" dir="ltr">
								<![endif]-->
								<div class="resize" dir="ltr" style="width:50%; display:inline-block; vertical-align:top; text-align: center;">
									<table class="resize" align="right" width="300" border="0" cellspacing="0" cellpadding="0" style="text-align: center; background-color:#FFFFFF;">
										<tr><td class="resize_h20" style="font-size:0; display:block; height:20px;">&nbsp;</td></tr>
										<tr>
											<td class="resize_height">
												<table class="resize_w90" width="268" border="0" align="center" valign="top" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
													<!--CRIT GREEN-->
													<tr>
														<td><a href="${item.data.one_productLink || "#"}" target="_blank"><img class="resize_h40" src="${item.data.one_ecolabel || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank-1000x152.png"}" height="30" width="197" alt="Eco Label" style="display:block; padding:0; margin:0; border:0; height:30px; width:197px;"></a></td>
													</tr>
													<tr><td style="font-size:0; display:block; height:5px;">&nbsp;</td></tr>
													<!--END CRIT GREEN-->
													<tr>
														<td align="left" style="font-weight:800; font-size:16px; color:#393E46;"><a class="resize_text20" href="${item.data.one_productLink || "#"}" target="_blank" style="color:#393E46; text-decoration:none;">${item.data.one_title || ""}</a></td>
													</tr>
													<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
													<tr>
														<td align="left" style="font-size:14px; color:#656F84;"><a class="resize_text18" href="${item.data.one_productLink || "#"}" target="_blank" style="color:#656F84; text-decoration:none;">${item.data.one_text || ""}</a>
														</td>
													</tr>
													<tr><td style="font-size:0; display:block; height:20px;">&nbsp;</td></tr>
													<!--LABEL-->
													<tr>
														<td align="left" style="font-size:0; display:block;"><a href="${item.data.one_productLink || "#"}" target="_blank"><img class="resize" src="${item.data.one_label || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank-1000x152.png"}" height="26" width="268" alt="Label" style="display:block; padding:0; margin:0; border:0; height:26px; width:268px;"></a></td>
													</tr>
													<!--END LABEL-->
													<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
													<tr>
														<td align="left" style="font-size:14px; color:#FE9600;"><a class="resize_text16" href="${item.data.one_productLink || "#"}" target="_blank" style="color:#FE9600; text-decoration:none;"> ${item.data.one_fromPrice || ""}<br>
															<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;">${item.data.one_crossedOutPrice ? `<strike style="font-size:16px;">&nbsp;${item.data.one_crossedOutPrice}&nbsp;</strike>&nbsp;` : ""}${formatPrice(item.data.one_price, language)}</span>&nbsp;<br>
															${item.data.one_unit || ""} </a>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr><td class="resize_h30" style="font-size:0; display:block; height:20px;">&nbsp;</td></tr>
									</table>
								</div>
								<!--[if (gte mso 9)|(IE)]>
										</td>
									</tr>
								</table>
								<![endif]-->
							</td>
						</tr>
						<tr><td style="display:block; font-size:0; height:15px;">&nbsp;</td></tr>
						`;
				// Ajout des 3 lignes de séparation sauf si le bloc précédent est un CTA
				if (!(blocks[index + 1] && blocks[index + 1].type === "cta")) {
					htmlContent += `
						<tr><td style="display:block; font-size:0; height:15px; background-color:#FFFFFF;">&nbsp;</td></tr>
						<tr><td style="display:block; font-size:0; background-color:#EDF1F7; height:2px;">&nbsp;</td></tr>
						<tr><td style="display:block; font-size:0; height:15px; background-color:#FFFFFF;">&nbsp;</td></tr>
				`;
				}
				htmlContent += `
					</table >
					<!--L1-div-->
					`;
				break;

			case "product":
				htmlContent += `
					<!--L1-div-->
					<table class="resize" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:600px;">
						<tr>
							<td dir="ltr" style="text-align:center; vertical-align:top; font-size:0; background-color:#FFFFFF;">
								<!--[if (gte mso 9)|(IE)]>
								<table dir="ltr" width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
									<tr>
										<td width="50%" dir="ltr">
								<![endif]-->
								<div class="resize" dir="ltr" style="width:50%; display:inline-block; vertical-align:top;">
									<table class="center_table" width="100%" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td align="center">
												<table class="resize_sep_noBorder" align="left" width="300" border="0" cellspacing="0" cellpadding="0" style="text-align: center; border-right:1px solid #EDF1F7; background-color:#FFFFFF;">
													<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
													<tr>
														<td>
															<table class="resize" width="298" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
																<tr>
																	<td style="font-size:0;"><a href="${item.data.productLink1 || "#"}" target="_blank"><img class="resize_w70" src="https://raja.scene7.com/is/image/Raja?template=TA-picture-200&$image=${item.data.image1 || ""}&hei=490&wid=656&resMode=sharp4" width="297" height="222" style="display:block; padding:0; margin:0 auto; border:0; width:297px; height:222px;" alt="${item.data.title1 || ""}"/></a></td>
																</tr>
															</table>
															<table class="resize_w90" width="268" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
																<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
																<!--CRIT GREEN : supprimer le 1er TR et transfo du 2eme à 35px si critère opposé et ajout de la classe "none" sur le TR / zone encadrée à supprimer si pas de critère-->
																<tr>
																	<td style="font-size:0; display:block;"><a href="${item.data.productLink1 || "#"}" target="_blank"><img class="resize_h40" src="${item.data.ecolabel1 || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank-1000x152.png"}" height="30" width="197" alt="Eco Label" style="display:block; padding:0; margin:0; border:0; height:30px; width:197px;"></a></td>
																</tr>
																<tr><td style="font-size:0; display:block; height:5px;">&nbsp;</td></tr>
																<!--END CRIT GREEN-->
																<tr>
																<!--TAILLE DU TD A MODIFIER (de 10px en 10px) POUR ALIGNEMENT DES PRIX !-->
																	<td class="resize_height" valign="top" style="height:70px;">
																<!-- -->
																		<table align="left" border="0" cellpadding="0" cellspacing="0" >
																			<tr>
																				<td align="left" style="font-weight:800; font-size:16px; color:#393E46;"><a class="resize_text20" href="${item.data.productLink1 || "#"}" target="_blank" style="font-weight:800; font-size:16px; color:#393E46; text-decoration:none;">${item.data.title1 || ""}</a></td>
																			</tr>
																			<tr><td style="font-size:0; display:block; height:5px;">&nbsp;</td></tr>
																			<tr>
																				<td class="none" align="left" style="font-size:14px; color:#656F84;"><a href="${item.data.productLink1 || "#"}" target="_blank" style="font-size:14px; color:#656F84; text-decoration:none;">${item.data.text1 || ""}</a></td>
																			</tr>
																		</table>
																	</td>
																</tr>
																<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
																<!--LABEL : supprimer le 1er TR et transfo du 2eme à 30px si critère opposé et ajout de la classe "none" sur le TR / zone encadrée à supprimer si pas de label-->
																<tr>
																	<td align="left" style="font-size:0; display:block;"><a href="${item.data.productLink1 || "#"}" target="_blank"><img class="resize" src="${item.data.label1 || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank-1000x152.png"}" height="26" width="268" alt="Label" style="display:block; padding:0; margin:0; border:0; height:26px; width:268px;"></a></td>
																</tr>
																<tr><td style="font-size:0; display:block; height:4px;">&nbsp;</td></tr>
																<!--END LABEL-->
																<tr>
																	<td align="left" style="font-size:14px; color:#FE9600;">
																		<a class="resize_text16" href="${item.data.productLink1 || "#"}" target="_blank" style="font-size:14px; color:#FE9600; text-decoration:none;">
																			${item.data.fromPrice1 || ""}<br>
																			<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;">
																				${item.data.crossedOutPrice1 ? `<strike style="font-size:16px;">&nbsp;${item.data.crossedOutPrice1}&nbsp;</strike>&nbsp;` : ""}${formatPrice(item.data.price1, language)}
																			</span>&nbsp;<br>
																			${item.data.unit1 || ""}
																		</a>
																	</td>
																</tr>
																<tr><td class="resize_h30" style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
																<tr><td class="view" style="font-size:0; display:none; height:15px;">&nbsp;</td></tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</div>
								<!--[if (gte mso 9)|(IE)]>
									</td>
									<td width="50%" dir="ltr">
								<![endif]-->
								<div class="resize" dir="ltr" style="width:50%; display:inline-block; vertical-align:top; text-align: center;">
									<table class="resize_w90 resize_sep_borderTop" width="270" border="0" align="center" valign="top" cellpadding="0" cellspacing="0">
										<tr>
											<td>
												<table class="resize" width="298" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
													<tr><td class="resize_h20" style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
													<tr>
														<td style="font-size:0;"><a href="${item.data.productLink2 || "#"}" target="_blank"><img class="resize_w70" src="https://raja.scene7.com/is/image/Raja?template=TA-picture-200&$image=${item.data.image2 || ""}&hei=490&wid=656&resMode=sharp4" width="297" height="222" style="display:block; padding:0; margin:0 auto; border:0; width:297px; height:222px;" alt="${item.data.title2 || ""}"/></a></td>
													</tr>
												</table>
												<table class="resize_w90" width="268" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
													<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
													<!--CRIT GREEN : supprimer le 1er TR et transfo du 2eme à 35px si critère opposé et ajout de la classe "none" sur le TR / zone encadrée à supprimer si pas de critère-->
													<tr>
														<td style="font-size:0; display:block;"><a href="${item.data.productLink2 || "#"}" target="_blank"><img class="resize_h40" src="${item.data.ecolabel2 || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank-1000x152.png"}" height="30" width="197" alt="Eco Label" style="display:block; padding:0; margin:0; border:0; height:30px; width:197px;"></a></td>
													</tr>
													<tr><td style="font-size:0; display:block; height:5px;">&nbsp;</td></tr>
													<!--END CRIT GREEN-->
													<tr>
														<!--TAILLE DU TD A MODIFIER (de 10px en 10px) POUR ALIGNEMENT DES PRIX !-->
														<td class="resize_height" valign="top" style="height:70px;">
														<!-- -->
															<table align="left" border="0" cellpadding="0" cellspacing="0" >
																<tr>
																	<td align="left" style="font-weight:800; font-size:16px; color:#393E46;"><a class="resize_text20" href="${item.data.productLink2 || "#"}" target="_blank" style="font-weight:800; font-size:16px; color:#393E46; text-decoration:none;">${item.data.title2 || ""}</a></td>
																</tr>
																<tr><td style="font-size:0; display:block; height:5px;">&nbsp;</td></tr>
																<tr>
																	<td class="none" align="left" style="font-size:14px; color:#656F84;"><a href="${item.data.productLink2 || "#"}" target="_blank" style="font-size:14px; color:#656F84; text-decoration:none;">${item.data.text2 || ""}</a></td>
																</tr>
															</table>
														</td>
													</tr>
													<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
													<!--LABEL : supprimer le 1er TR et transfo du 2eme à 30px si critère opposé et ajout de la classe "none" sur le TR / zone encadrée à supprimer si pas de label-->
													<tr>
														<td align="left" style="font-size:0; display:block;"><a href="${item.data.productLink2 || "#"}" target="_blank"><img class="resize" src="${item.data.label2 || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank-1000x152.png"}" height="26" width="268" alt="Label" style="display:block; padding:0; margin:0; border:0; height:26px; width:268px;"></a></td>
													</tr>
													<tr><td style="font-size:0; display:block; height:4px;">&nbsp;</td></tr>
													<!--END LABEL-->
													<tr>
														<td align="left" style="font-size:14px; color:#FE9600;">
															<a class="resize_text16" href="${item.data.productLink2 || "#"}" target="_blank" style="font-size:14px; color:#FE9600; text-decoration:none;">
																${item.data.fromPrice2 || ""}<br>
																<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;">
																	${item.data.crossedOutPrice2 ? `<strike style=\"font-size:16px;\">&nbsp;${item.data.crossedOutPrice2}&nbsp;</strike>&nbsp;` : ""}${formatPrice(item.data.price2, language)}
																</span>&nbsp;<br>
																${item.data.unit2 || ""}
															</a>
														</td>
													</tr>
													<tr><td class="resize_h30" style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
													<tr><td class="view" style="font-size:0; display:none; height:15px;">&nbsp;</td></tr>
												</table>
											</td>
										</tr>
									</table>
								</div>
								<!--[if (gte mso 9)|(IE)]>
									</td>
								</tr>
							</table>
							<![endif]-->
						</td>
					</tr>
`;
				// Ajout des 3 lignes de séparation sauf si le bloc précédent est un CTA
				if (!(blocks[index + 1] && blocks[index + 1].type === "cta")) {
					htmlContent += `
						<tr><td style="display:block; font-size:0; height:15px; background-color:#FFFFFF;">&nbsp;</td></tr>
						<tr><td style="display:block; font-size:0; background-color:#EDF1F7; height:2px;">&nbsp;</td></tr>
						<tr><td style="display:block; font-size:0; height:15px; background-color:#FFFFFF;">&nbsp;</td></tr>
					`;
				}
				htmlContent += `
					</table>
					<!--L1-div-->
					`;
				break;

			case "title":
				htmlContent += `
				<!--TITRE-->
				<table class="resize" align="center" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#FFFFFF;">
				<tr><td style="font-size:0; height:10px;">&nbsp;</td></tr>
				<tr>
					<td align="center" valign="top" style="font-size:24px; font-weight:800; color:#656F84; ">
					<table class="resize_w90" align="center" width="540" border="0" cellspacing="0" cellpadding="0">
						<tr>
						<td align="center" style="font-size:${item.data.textSize || "22px"}; font-weight:800; color:${item.data.textColor || "#656F84"};"><a class="resize_text26" href="${item.data.link || "#"}" target="_blank" style="font-size:22px; font-weight:800; color:#656F84; text-decoration:none; text-transform:uppercase;">${item.data.bigTitle || ""}</a></td>
						</tr>
					</table>
					</td>
				</tr>
				<tr><td style="display:block; font-size:0; background-color:#EDF1F7; height:2px;">&nbsp;</td></tr>
				<tr><td style="font-size:0; height:20px;">&nbsp;</td></tr>
				</table>
				<!--END TITRE-->
					`;
				break;

			case "banner":
				htmlContent += `
				<!--TOP BAN-->
				<table class="resize" align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
					<tr>
						<td class="none" style="font-size:0; display:block; width:600px;"><a href="${item.data.bannerLinkText || "#"}" target="_blank" title="${item.data.bannerAltTitle || ""}"><img src="${item.data.bannerImage || ""}" width="600" height="180" style="display:block; padding:0; margin:0; border:0; width:600px; height:180px;" alt="${item.data.bannerAltTitle || ""}"/></a></td>
					</tr>
					<tr>
						<td class="view" style="display:none; font-size:0;"><a href="${item.data.bannerLinkText || "#"}" target="_blank" title="${item.data.bannerAltTitle || ""}"><img class="resize" src="${getMobileImageUrl(item.data.bannerImage) || ""}" width="600" height="400" style="display:block; padding:0; margin:0; border:0; width:600px; height:400px;" alt="${item.data.bannerAltTitle || ""}"/></a></td>
					</tr>
				</table>
				<!--END TOP BAN-->
					`;
				break;

			case "cta":
				htmlContent += `
				<!--CTA IMG-->
				<table class="resize" align="center" width="600" border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
					<tr>
						<td class="none" style="font-size:0; display:block; width:600px;"><a href="${item.data.ctaLinkText || "#"}" target="_blank" title="${item.data.ctaAltTitle || ""}"><img src="${item.data.ctaImage || ""}" width="600" height="120" style="display:block; padding:0; margin:0; border:0; width:600px; height:120px;" alt="${item.data.ctaAltTitle || ""}"/></a></td>
					</tr>
					<tr>
						<td class="view" style="display:none; font-size:0;"><a href="${item.data.ctaLinkText || "#"}" target="_blank" title="${item.data.ctaAltTitle || ""}"><img class="resize" src="${getMobileImageUrl(item.data.ctaImage) || ""}" width="600" height="160" style="display:block; padding:0; margin:0; border:0; width:600px; height:160px;" alt="${item.data.ctaAltTitle || ""}"/></a></td>
					</tr>
				</table>
				<!--END CTA IMG-->
				`;
				break;

			default:
				htmlContent += `
	<section>
		<p>Unknown type: ${item.type}</p>
	</section>
					`;
				break;
		}
	});

	// On ajoute le footer (optionnel) et on ferme
	htmlContent += `
${footer}
</body>
</html>
`;
	return htmlContent;
}