// src/utils/generateHtml.js
import { formatPrice } from "./currency";

export default function generateHtml(blocks, header = "", footer = "", docTitle = "Newsletter", headerTexte = "", language = "fr") {

// Début du document
let htmlContent = `
<!DOCTYPE html
	PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&family=Raleway:wght@500;600;900&display=swap');
</style>
<!--[if !mso]><!-->
<style type="text/css">
	@font-face {
	font-family: Open sans, Raleway, Arial;
	src: url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');
	src: url('https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;900&display=swap');
	font-weight: normal;
	font-style: normal;
	}
</style>
<!--<![endif]-->

<style type="text/css">
	/* Removes spacing in Outlook - bug between cells */
	table,
	td {
	border-collapse: collapse !important;
	position: relative !important;
	border-spacing: 0 !important;
	mso-table-lspace: 0pt;
	mso-table-rspace: 0pt;
	}

	img {
	-ms-interpolation-mode: bicubic;
	border: 0;
	display: block !important;
	}

	html {
	width: 100%;
	background-color: #EDF1F7;
	}

	body {
	min-width: 100%;
	width: 100% !important;
	color: #393E46 !important;
	background-color: #EDF1F7 !important;
	font-family: Open sans, Arial, sans-serif !important;
	margin: 0;
	padding: 0;
	-webkit-font-smoothing: antialiased;
	-webkit-text-size-adjust: none;
	-ms-text-size-adjust: none;
	-ms-font-family: Open sans, Arial, sans-serif !important;
	font-size: 12px;
	}

	div[style*="margin:16px 0;"] {
	margin: 0 !important;
	}
</style>
<!--[if mso]>
<style>
body, table, td, span, a { font-family:Arial,sans-serif!important; text-decoration:none!important; }
table, td { border-collapse:collapse!important; position:relative!important; border-spacing:0!important; mso-table-lspace:0pt; mso-table-rspace:0pt; }
img { -ms-interpolation-mode: bicubic; border:0; display:block!important; }
</style>
<![endif]-->

<style type="text/css">
	@media only screen and (max-width:600px) {
	.resize {
		width: 100% !important;
		height: auto !important;
	}
	.none {
		display: none !important;
	}
	.view {
		display: block !important;
	}
	.center {
		text-align: center !important;
	}
	.center_table {
		text-align: center !important;
		margin: 0 auto !important;
	}
	/* etc. ... */
	}
</style>

<style>
	/* Desktop style for 3-2 columns */
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
</head>
<body>
<table class="resize" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#EDF1F7;">
	<tr><td style="display:none; font-size:12px;">
		${headerTexte}
		<span style="display:none;max-height:0px;overflow:hidden"> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr> ‌ ‌ ‌ ‌ ‌ ‌</span></td></tr>
	<tr>
		<td align="center">
${header}
`;

blocks.forEach((item) => {
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
						<td>
							<table class="resize_w90" width="268" border="0" align="center" valign="top" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
								<!--CRIT GREEN-->
								<tr>
									<td><a href="${item.data.one_productLink || "#"}" target="_blank"><img class="resize_h40" src="${item.data.one_ecolabel || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank.png"}" height="30" width="197" alt="Eco Label" style="display:block; padding:0; margin:0; border:0; height:30px; width:197px;"></a></td>
								</tr>
								<tr><td style="font-size:0; display:block; height:5px;">&nbsp;</td></tr>
								<!--END CRIT GREEN-->
								<tr>
									<td align="left" style="font-weight:800; font-size:16px; color:#393E46;"><a class="resize_text20" href="${item.data.one_productLink || "#"}" target="_blank" style="color:#393E46; text-decoration:none;">${item.data.one_title || ""}</a></td>
								</tr>
								<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
								<tr>
								<td align="left" style="font-size:14px; color:#656F84;"><a class="resize_text18" href="${item.data.one_productLink || "#"}" target="_blank" style="color:#656F84; text-decoration:none;">${item.data.one_text || ""}</a>
								</tr>
								<tr><td style="font-size:0; display:block; height:20px;">&nbsp;</td></tr>
								<!--LABEL-->
								<tr>
									<td align="left" style="font-size:0; display:block;"><a href="${item.data.one_productLink || "#"}" target="_blank"><img class="resize" src="${item.data.one_label || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank.png"}" height="26" width="268" alt="Label" style="display:block; padding:0; margin:0; border:0; height:26px; width:268px;"></a></td>
								</tr>
								<!--END LABEL-->
								<tr><td style="font-size:0; display:block; height:10px;">&nbsp;</td></tr>
								<tr>
									<td align="left" style="font-size:14px; color:#FE9600;">
									<a class="resize_text16" href="${item.data.one_productLink || "#"}" target="_blank" style="color:#FE9600; text-decoration:none;">${item.data.one_fromPrice || ""}<br>
									<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;"><strike style="font-size:16px;">${item.data.one_crossedOutPrice ? `${item.data.one_crossedOutPrice}&nbsp;` : ""}</strike></span>
										<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;">${formatPrice(item.data.one_price, language)}</span>&nbsp;<br>
										${item.data.one_unit || ""}
									</a>
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
	
	<tr><td style="display:block; font-size:0; background-color:#EDF1F7; height:2px;">&nbsp;</td></tr>
	<tr><td style="display:block; font-size:0; height:15px; background-color:#FFFFFF;">&nbsp;</td></tr>
</table>
<!--END 07 BIG PDT - div-->	
`;
			break;

		case "product":
			htmlContent += `
					<!--L1-div-->
				<table class="resize" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
					style="max-width:600px;">
					<tr>
						<td dir="ltr"
							style="text-align:center; vertical-align:top; font-size:0; background-color:#FFFFFF;">
							<!--[if (gte mso 9)|(IE)]>
			<table dir="ltr" width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td width="50%" dir="ltr">
			<![endif]-->
							<div class="resize" dir="ltr" style="width:50%; display:inline-block; vertical-align:top;">
								<table class="center_table" width="100%" border="0" cellpadding="0" cellspacing="0">
									<tr>
										<td align="center">
											<table class="resize_sep_noBorder" align="left" width="300" border="0"
												cellspacing="0" cellpadding="0"
												style="text-align: center; border-right:1px solid #EDF1F7; background-color:#FFFFFF;">
												<tr>
													<td style="font-size:0; display:block; height:10px;">&nbsp;</td>
												</tr>
												<tr>
													<td>
														<table class="resize" width="298" border="0" align="center"
															cellpadding="0" cellspacing="0"
															style="background-color:#FFFFFF;">
															<tr>
																<td style="font-size:0;"><a
																		href="${item.data.productLink1 || "#"}"
																		target="_blank"><img class="resize"
																			src="https://raja.scene7.com/is/image/Raja?template=TA-picture-200&$image=${item.data.image1 || ""}&hei=490&wid=656&resMode=sharp4"
																			width="297" height="222"
																			style="display:block; padding:0; margin:0; border:0; width:297px; height:222px;"
																			alt="${item.data.title1 || ""}" /></a>
																</td>
															</tr>
														</table>
														<table class="resize_w90" width="268" border="0" align="center"
															cellpadding="0" cellspacing="0"
															style="background-color:#FFFFFF;">
															<tr>
																<td style="font-size:0; display:block; height:10px;">&nbsp;</td>
															</tr>
															<!--CRIT GREEN-->
															<tr>
																<td style="font-size:0; display:block;"><a
																		href="${item.data.productLink1 || "#"}"
																		target="_blank"><img class="resize_h40"
																			src="${item.data.ecolabel1 || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank.png"}"
																			height="30" width="197"
																			alt="Eco Label"
																			style="display:block; padding:0; margin:0; border:0; height:30px; width:197px;"
																			id="pdt-badge-1-test"></a>
																</td>
															</tr>
															<tr>
																<td style="font-size:0; display:block; height:5px;">
																	&nbsp;</td>
															</tr>
															<!--END CRIT GREEN-->
															<tr>
																<td class="resize_height" valign="top"
																	style="height:90px;">
																	<table align="left" border="0" cellpadding="0"
																		cellspacing="0">
																		<tr>
																			<td align="left"
																				style="font-weight:800; font-size:16px; color:#393E46;">
																				<a id="pdt-titre-1-test"
																					class="resize_text20"
																					href="${item.data.productLink1 || "#"}"
																					target="_blank"
																					style="font-weight:800; font-size:16px; color:#393E46; text-decoration:none;">${item.data.title1 || ""}</a>
																			</td>
																		</tr>
																		<tr>
																			<td
																				style="font-size:0; display:block; height:5px;">
																				&nbsp;</td>
																		</tr>
																		<tr>
																			<td class="none" align="left"
																				style="font-size:14px; color:#656F84;">
																				<a id="pdt-desc-1-test"
																					href="${item.data.productLink1 || "#"}"
																					target="_blank"
																					style="font-size:14px; color:#656F84; text-decoration:none;">${item.data.text1 || ""}</a>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
															<tr>
																<td style="font-size:0; display:block; height:10px;">
																	&nbsp;</td>
															</tr>
															<!--LABEL-->
															<tr>
																<td align="left" style="font-size:0; display:block;"><a
																		href="${item.data.productLink1 || "#"}"
																		target="_blank"><img class="resize"
																			src="${item.data.label1 || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank.png"}"
																			height="26" width="268" alt="Label"
																			style="display:block; padding:0; margin:0; border:0; height:26px; width:268px;"></a>
																</td>
															</tr>
															<tr>
																<td style="font-size:0; display:block; height:4px;">
																	&nbsp;</td>
															</tr>
															<!--END LABEL-->
															<tr>
																<td align="left" style="font-size:14px; color:#FE9600;">
																	<a class="resize_text16"
																		href="${item.data.productLink1 || "#"}"
																		target="_blank"
																		style="font-size:14px; color:#FE9600; text-decoration:none;">
																		${item.data.fromPrice1 || ""}<br>
																		<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;"><strike style="font-size:16px;">${item.data.crossedOutPrice1 ? `${item.data.crossedOutPrice1}&nbsp;` : ""}</strike></span>
																		<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;">${formatPrice(item.data.price1, language)}</span>&nbsp;<br>
																		${item.data.unit1 || ""}
																	</a>
																</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td class="resize_h30"
														style="font-size:0; display:block; height:10px;">&nbsp;</td>
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
							<div class="resize" dir="ltr"
								style="width:50%; display:inline-block; vertical-align:top; text-align: center;">
								<table class="resize_w90 resize_sep_borderTop" width="270" border="0" align="center"
									valign="top" cellpadding="0" cellspacing="0">
									<tr>
										<td>
											<table class="resize" width="298" border="0" align="center" cellpadding="0"
												cellspacing="0" style="background-color:#FFFFFF;">
												<tr>
													<td class="resize_h20"
														style="font-size:0; display:block; height:10px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="font-size:0;"><a
															href="${item.data.productLink2 || "#"}"
															target="_blank"><img class="resize"
																src="https://raja.scene7.com/is/image/Raja?template=TA-picture-200&$image=${item.data.image2 || ""}&hei=490&wid=656&resMode=sharp4"
																width="297" height="222"
																style="display:block; padding:0; margin:0; border:0; width:297px; height:222px;"
																alt="${item.data.title2 || ""}" /></a>
													</td>
												</tr>
											</table>
											<table class="resize_w90" width="268" border="0" align="center"
												cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
												<tr>
													<td style="font-size:0; display:block; height:10px;">&nbsp;</td>
												</tr>
												<!--CRIT GREEN-->
												<tr>
													<td style="font-size:0; display:block;"><a
															href="${item.data.productLink2 || "#"}"
															target="_blank"><img class="resize_h40"
																src="${item.data.ecolabel2 || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank.png"}"
																height="30" width="197" alt="Eco Label"
																style="display:block; padding:0; margin:0; border:0; height:30px; width:197px;"
																id="pdt-badge-2-test"></a>
													</td>
												</tr>
												<tr>
													<td style="font-size:0; display:block; height:5px;">&nbsp;</td>
												</tr>
												<!--END CRIT GREEN-->
												<tr>
													<td class="resize_height" valign="top" style="height:90px;">
														<table align="left" border="0" cellpadding="0" cellspacing="0">
															<tr>
																<td align="left"
																	style="font-weight:800; font-size:16px; color:#393E46;">
																	<a class="resize_text20"
																		href="${item.data.productLink2 || "#"}"
																		target="_blank"
																		style="font-weight:800; font-size:16px; color:#393E46; text-decoration:none;"
																		id="pdt-titre-2-test">${item.data.title2 || ""}</a>
																</td>
															</tr>
															<tr>
																<td style="font-size:0; display:block; height:5px;">
																	&nbsp;</td>
															</tr>
															<tr>
																<td class="none" align="left"
																	style="font-size:14px; color:#656F84;"><a
																		href="${item.data.productLink2 || "#"}"
																		target="_blank"
																		style="font-size:14px; color:#656F84; text-decoration:none;"
																		id="pdt-desc-2-test">${item.data.text2 || ""}</a>
																</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td style="font-size:0; display:block; height:10px;">&nbsp;</td>
												</tr>
												<!--LABEL-->
												<tr>
													<td align="left" style="font-size:0; display:block;"><a
															href="${item.data.productLink2 || "#"}"
															target="_blank"><img class="resize"
																src="${item.data.label2 || "https://imgnews.raja-group.com/00-structure/label/ALL-label-blank.png"}"
																height="26" width="268" alt="Label"
																style="display:block; padding:0; margin:0; border:0; height:26px; width:268px;"></a>
														</td>
													</tr>
													<tr>
														<td style="font-size:0; display:block; height:4px;">&nbsp;</td>
													</tr>
													<!--END LABEL-->
													<tr>
														<td align="left" style="font-size:14px; color:#FE9600;">
															<a class="resize_text16"
																href="${item.data.productLink2 || "#"}"
																target="_blank"
																style="font-size:14px; color:#FE9600; text-decoration:none;">
																${item.data.fromPrice2 || ""}<br>
																<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;"><strike style="font-size:16px;">${item.data.crossedOutPrice2 ? `${item.data.crossedOutPrice2}&nbsp;` : ""}</strike></span>
																<span class="resize_text30" style="font-size:20px; font-weight:800; color:#FE9600; text-decoration:none;">${formatPrice(item.data.price2, language)}</span>&nbsp;<br>
																${item.data.unit2 || ""}
															</a>
														</td>
													</tr>
												</tr>
												<tr>
													<td class="view" style="font-size:0; display:none; height:15px;">
														&nbsp;</td>
												</tr>
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
					<tr>
						<td style="display:block; font-size:0; height:15px; background-color:#FFFFFF;">&nbsp;</td>
					</tr>
					<tr>
						<td style="display:block; font-size:0; height:15px; background-color:#FFFFFF;">&nbsp;</td>
					</tr>
				</table>
				<!--L1-div-->
					`;
			break;

		case "title":
			htmlContent += `
				<table class="resize" align="center" width="600" border="0" cellspacing="0" cellpadding="0"
					style="background-color:#FFFFFF;">
					<tr>
						<td style="font-size:0; height:10px;">&nbsp;</td>
					</tr>
					<tr>
						<td align="center" valign="top" style="font-size:24px; font-weight:800; color:#656F84;">
							<table class="resize_w90" align="center" width="540" border="0" cellspacing="0"
								cellpadding="0">
								<tr>
									<td align="center" style="font-size: ${item.data.textSize || "22px"}; font-weight:800; color:${item.data.textColor || "#656F84"};">
										${item.data.bigTitle || ""}
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td style="display:block; font-size:0; background-color:#EDF1F7; height:2px;">&nbsp;</td>
					</tr>
					<tr>
						<td style="font-size:0; height:20px;">&nbsp;</td>
					</tr>
				</table>
					`;
			break;

		case "banner":
			htmlContent += `
				<table class="resize" align="center" width="600" border="0" cellpadding="0" cellspacing="0"
					style="background-color:#FFFFFF;">
					<tr>
						<td class="none" style="font-size:0; display:block; width:600px;">
			<a href="${item.data.bannerLinkText || "#"}"
				target="_blank" title="${item.data.bannerAltTitle || ""}">
				<img src="${item.data.bannerImage || ""}"
				width="600" height="180"
				style="display:block; padding:0; margin:0; border:0; width:600px; height:180px;"
				alt="${item.data.bannerAltTitle || ""}" />
			</a>
			</td>
					</tr>
					<tr>
						<td class="view" style="display:none; font-size:0;">
			<a href="${item.data.bannerLinkText || "#"}"
				target="_blank" title="${item.data.bannerAltTitle || ""}">
				<img class="resize"
				src="${item.data.bannerImage || ""}"
				width="600" height="400"
				style="display:block; padding:0; margin:0; border:0; width:600px; height:400px;"
				alt="${item.data.bannerAltTitle || ""}" />
			</a>
			</td>
					</tr>
				</table>
					`;
			break;

		case "cta":
			htmlContent += `
				<table class="resize" align="center" width="600" border="0" cellpadding="0" cellspacing="0"
					style="background-color:#FFFFFF;">
					<tr>
						<td class="none" style="font-size:0; display:block; width:600px;">
			<a href="${item.data.ctaLinkText || "#"}"
				target="_blank" title="${item.data.ctaAltTitle || ""}">
				<img src="${item.data.ctaImage || ""}"
				width="600" height="120"
				style="display:block; padding:0; margin:0; border:0; width:600px; height:120px;"
				alt="${item.data.ctaAltTitle || ""}" />
			</a>
			</td>
					</tr>
					<tr>
						<td class="view" style="display:none; font-size:0;">
			<a href="${item.data.ctaLinkText || "#"}" target="_blank" title="${item.data.ctaAltTitle || ""}">
				<img class="resize"
				src="${item.data.ctaImage || ""}"
				width="600" height="160"
				style="display:block; padding:0; margin:0; border:0; width:600px; height:160px;"
				alt="${item.data.ctaAltTitle || ""}" />
			</a>
			</td>
					</tr>
				</table>
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