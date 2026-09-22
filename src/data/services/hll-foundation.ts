import type { ServicePageData } from "./types";

export const hllFoundation: ServicePageData = {
  slug: "hll-foundation",
  variant: "hll-foundation",
  brand: "HLL Foundation",
  breadcrumb: ["Services", "HLL Foundation"],
  hero: {
    headline: "Data your business can finally trust",
    support:
      "Eighty percent of AI and analytics failures trace back to the data engineering beneath them. That is the layer we build.",
    tabs: [
      { id: "data-engineering", label: "Data Engineering" },
      { id: "data-analytics", label: "Data Analytics" },
      { id: "data-audit", label: "Data Audit" },
      { id: "data-infrastructure", label: "Data Infrastructure Assessment" },
    ],
  },
  capabilities: {
    eyebrow: "What we offer",
    title: "Capabilities",
    items: [
      {
        id: "data-engineering",
        index: "01/04",
        title: "Data Engineering",
        description:
          "We build the ingestion, transformation, and warehousing layer that analytics and AI workloads run on. Scope runs from source connectivity through to a governed warehouse: batch and streaming ingestion, change-data-capture off production systems, transformation logic held in version control, and storage sized to the workload it will carry. Consolidating a fragmented estate runs as staged cutovers with reconciliation at each stage, so the migration stays verifiable throughout.",
        subServices: [
          {
            name: "Data Ingestion & Integration",
            description:
              "Batch and streaming sources land through Fivetran, Airbyte, and Kafka into one governed ingestion layer. Change-data-capture covers production databases where a nightly extract would miss intra-day updates.",
          },
          {
            name: "Data Transformation & Processing",
            description:
              "Transformation logic lives in dbt and runs on Airflow schedules. We default to ELT where the warehouse can carry the compute, which puts every transformation in version control with tests attached to each model.",
          },
          {
            name: "Data Storage & Warehousing",
            description:
              "Warehouses and lakehouses on Snowflake, BigQuery, Redshift, or Databricks, sized to the workload. Access control and lineage are configured during the build, while the schema is still open to change.",
          },
          {
            name: "Data Migration & Modernization",
            description:
              "Legacy on-premise systems move to the cloud in staged cutovers, with row-level reconciliation against the source at each stage. Rollback stays available until the reconciliation clears.",
          },
        ],
      },
      {
        id: "data-analytics",
        index: "02/04",
        title: "Data Analytics",
        description:
          "We build the reporting and analytical models that turn a warehouse into a decision. That spans descriptive reporting on modeled tables, predictive and forecasting models, segmentation, and language models applied to unstructured text — documents, call transcripts, and free-text fields. Models ship with monitoring on prediction drift and feature stability, with retraining triggers agreed at deployment. Metric definitions live in the warehouse model, so a number on a dashboard traces back to one definition.",
        subServices: [
          {
            name: "BI & Reporting",
            description:
              "Reporting in Power BI, Tableau, or Looker, built on modeled warehouse tables so metric definitions sit in one place. When finance and operations disagree on a number, the definition traces back to a single model.",
          },
          {
            name: "Predictive Analytics & Forecasting",
            description:
              "Time-series forecasting and next-best-action models, deployed with monitoring on prediction drift and feature stability. Retraining triggers are set at deployment against agreed thresholds.",
          },
          {
            name: "Segmentation",
            description:
              "Cluster models translated into explicit decision rules and pushed to a segment store, then into the CRM and campaign platforms that consume them. Business teams can act on a segment without an analyst in the loop.",
          },
          {
            name: "Operations & Marketing Analytics",
            description:
              "Call-topic and sentiment analysis on contact centre interactions, web journey metrics, and workforce forecasting. Each measure ties to a KPI with a named owner inside the business.",
          },
        ],
      },
      {
        id: "data-audit",
        index: "03/04",
        title: "Data Audit",
        description:
          "We audit the data itself: completeness, duplication, lineage, and where regulated or sensitive fields reside. The output is a defect list ranked by business risk. Engagements run on a fixed price, and the same team that identifies the defects can build the remediation.",
        subServices: [
          {
            name: "Data Quality",
            description:
              "Completeness, duplication, and consistency checks written as tests in Great Expectations or Soda, running against each load. Failures raise before the data publishes, with the failing rows attached.",
          },
          {
            name: "Data Sources",
            description:
              "A full accounting of where data originates, including feeds nobody currently owns. Each source gets a named owner in the catalog as part of the audit.",
          },
          {
            name: "Ops Automation",
            description:
              "Quality checks embedded in the pipeline as a build step, so a failed check stops the run. The alert carries the table, the rule, and the failing row count.",
          },
          {
            name: "Security",
            description:
              "Where regulated and sensitive fields sit, and who currently holds access to them. The audit produces an access map per table, reconciled against role definitions.",
          },
        ],
      },
      {
        id: "data-infrastructure",
        index: "04/04",
        title: "Data Infrastructure Assessment",
        description:
          "We evaluate the current stack against what the analytics and AI roadmap requires: warehouses, pipelines, catalogs, and access controls. The output is a ranked remediation list with a cost against every item.",
        subServices: [
          {
            name: "Stack & Tooling Review",
            description:
              "Warehouses, pipelines, catalogs, and access controls reviewed against the workload now planned, including utilization and spend on each component.",
          },
          {
            name: "Architecture Blueprinting",
            description:
              "Ingestion, transformation, warehouse, and BI/AI layers specified with a named tool and a named owner for each. The blueprint is agreed before build starts and holds the interface contracts between layers.",
          },
          {
            name: "Cost / ROI Assessment",
            description:
              "Cost and ROI modelling on each recommendation: implementation cost, projected saving, and the exposure carried if it is deferred.",
          },
          {
            name: "Readiness Roadmap",
            description:
              "A sequenced plan for what to remediate before new development begins, with dependencies mapped between items. Each item carries an estimate and a prerequisite list.",
          },
        ],
      },
    ],
    tools: {
      cloud: ["AWS", "Azure", "GCP", "Snowflake"],
      data: ["Databricks", "BigQuery", "Digital Ocean", "dbt", "Airflow", "Spark"],
    },
  },
  outcomes: {
    title: "Outcome",
    cards: [
      {
        stat: "94%",
        description:
          "Segmentation rule accuracy for a North American pension provider, precise enough that the model became the targeting rule the business runs on.",
      },
      {
        stat: "4.2x",
        description:
          "Churn-risk lift in the top decile of a rebuilt retention model. 84% of eventual churners are now flagged early enough for the retention team to act.",
      },
      {
        stat: "$5M",
        description:
          "In at-risk fraud prevented within six months of a hybrid detection model going live. Its top risk band captures 3.5x more fraud than average.",
        hasMedia: true,
      },
      {
        stat: "3x",
        description:
          "Lift in the top three deciles of a predictive cross-sell model built on 500+ scored attributes, against a prior approach converting at 3%. $40M in incremental assets under management followed.",
      },
    ],
  },
  engagement: {
    title: "Engagement",
    intro: "Selected work behind the outcomes above.",
    cards: [
      {
        id: "wealth-management",
        title: "Wealth Management",
        client: "Wealth Management",
        tag: "Client work",
        description:
          "A large wealth management firm classified bond-document sentiment by hand, sentence by sentence, every day. We built an NLP classifier into the existing document pipeline, running in real time at 92–94% accuracy.",
        variant: "navy",
      },
      {
        id: "warehouse-consolidation",
        title: "Warehouse Consolidation",
        client: "Warehouse Consolidation",
        tag: "Client work",
        description:
          "A German enterprise ran its sales reporting off data scattered across SQL Server, Excel, and Salesforce. We built the ETL flow and the consolidated warehouse feeding Qlik Sense underneath it. Reports now run without manual assembly.",
        variant: "orange",
      },
    ],
  },
  expertVoice: {
    quote:
      "With the help of HLL, we were able to improve our sales performance. Reports run automatically, so we can support our customers more effectively and faster.",
    role: "Group Director, IT & Analytics",
  },
  relatedServices: [
    { label: "HLL Momentum", href: "/services/hll-people" },
    { label: "HLL Kinetic", href: "/services/hll-application" },
    { label: "HLL Governance & Trust", href: "/services/hll-trust" },
    { label: "HLL Motion", href: "/services/hll-ai" },
    { label: "HLL Ontology", href: "/services/hll-ontology" },
  ],
  cta: {
    headline: "Let's start a conversation.",
    buttonLabel: "Write to us",
    href: "/contact",
  },
};
