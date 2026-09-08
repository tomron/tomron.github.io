---
title: "4 insights from BDHW19"
pubDate: 2019-05-28T10:54:09.000Z
permalink: "/2019/05/28/4-insights-from-bdhw19/"
tags:
  - "bdhw19"
draft: false
---
<div dir="auto">This week I attended <a href="http://www.weizmann.ac.il/conferences/BD2019/program">BDHW19</a> - Big data in Health Care which was hosted by the Weizmann Institute of Science in collaboration with Nature Medicine. The conference had a great line up of speakers - leading researchers in the field from academia, industry and HMO's.</div>
<div dir="auto">There were few ideas and themes that were mentioned several times from different angles and I would highlight few of them.</div>
<div>(all sessions were recorded and I'll add a link once they are online)</div>
<br>
<div><b><u>EHR data in Israel</u></b> - By law, every Israeli resident must be registered with one of the HMO's. The HMO's in Israel are in a special position were the where they are run as non-for-profit organizations and are prohibited by law from denying any Israeli resident membership. Israelies HMO's hold EHR data from the mid nineties which means that the biggest HMO (Clalit) have longitudinal data of over 20 years for 4.5m heterogenic patients. Together with greater researchers and collaboration with the academia this enables amazing research which hopefully later propagates and influence our daily life.</div>
<div></div>
<div>See more in - <a href="http://clalitresearch.org/research-areas/publications/">Clalit publications</a>, <a href="https://www.maccabitech.com/category/publications/">Maccabi publications</a></div>
<div>The Israeli AI Healthcare Startup Landscape of 2018 - <a href="https://www.startuphub.ai/israeli-ai-healthcare-startups-2018">https://www.startuphub.ai/israeli-ai-healthcare-startups-2018</a></div>
<br>
<div><strong><u>Deployment of HC model</u><u>s</u></strong> - while there are great result and tools developed on research the way to deploy those models, use the new ideas is long and contains many obstacles. Only very few models really turned into health care products - alert system, treatment guide lines, bio markers, personalized medicine, etc. Few caveats in the way are interpretability, robust machine learning and causality. We must keep in mind that eventually our research should affect the end users - clinicians, patients, etc.</div>
<br>
<div>More on this -</div>
<div>Suchi Saria - "<a href="https://arxiv.org/abs/1904.07204">Tutorial : Safe and Reliable Machine Learning</a>" from FAT* 2019.</div>
<div>Ziad Obermeyer - "Using machine learning to understand and improve physician decision making".</div>
<br>
<div><strong><u>Collaboration</u></strong> - there are many efforts done in the field by many parties and in order to get good result and to move from journals to the field we need to cooperate. We need to ask the right questions and design good RCT or emulate them correctly. We need high quality data (or at least be aware to the quality of our data) so biobanks and dataset owners and researchers need to cooperate in order to get the most of the data. In order to see if our models generalizes well we should run them on different datasets. In order to see that our models make sense from medical perspective clinicians must be part of the process. We need everyone on board.</div>
<br>
<div>More on this -</div>
<div>Rachel Ramoni - "Mine is Big ? Ours is Bigger: Million Veteran Program and the Case for Coordinated Collaboration"</div>
<div>Nigam Shah - "Good machine learning for better healthcare". See also <a href="https://shahlab.stanford.edu/inf-consult">Clinical Informatics Consult</a>.</div>
<br>
<div><strong><u>Causality</u></strong> - The C word. Causal graph, counterfactuals, confounders, treatment effect.. It was present almost in every talk implicitly or explicitly.  Naturally some studies are more causal by nature such as "which drug is better", "do X cause Y" and some need to take into account causal mechanisms, identify confounding, etc. There is a shift from prediction tasks to causal tasks.</div>
<div>One key insight from Hernan's tutorial - we don't compare treatments, we compare strategies. I.e, studies in this field should move from comparing point interventions to comparing sustained treatment strategies. Moving to treatment strategies we should to be aware to treatment confounder loop.</div>
<br>
<div>More on this -</div>
<div>Uri Shalit - "Predicting individual-level treatment effects in patients: challenges and proposed best practices".</div>
<div>Miguel Hernan - "How do we learn what works? A two-step algorithm for causal inference from healthcare data" and tutorial "Comparative Effectiveness of Dynamic Treatment Strategies: The renaissance of the g-formula".</div>
